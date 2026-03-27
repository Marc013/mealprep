/**
 * Strongman Mealprep App
 * Vanilla JavaScript - No dependencies
 */

// ========== Shared Utilities ==========
const Utils = {
    storageKey: 'mealprep-state',

    async loadData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    loadState() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    },

    saveState(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save state:', e);
        }
    },

    escape(str) {
        if (typeof str !== 'string') return str;
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    formatNumber(value) {
        if (!Number.isFinite(value)) return value;
        return Number.isInteger(value) ? String(value) : value.toFixed(1);
    },

    initNavigation() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', () => {
                links.classList.toggle('open');
            });
        }
    }
};

const DataDerivations = {
    dayCounts: {
        training: 4,
        rest: 3
    },

    getMealMacros(meal, dayType) {
        return meal.variants ? meal.variants[dayType].macros : meal.macros;
    },

    getMealIngredients(meal, dayType) {
        if (meal.variants) {
            const variant = meal.variants[dayType];
            return variant.ingredients
                ? variant.ingredients
                : [...(meal.baseIngredients || []), ...(variant.extraIngredients || [])];
        }

        return meal.ingredients || [];
    },

    calculatePlanTotals(data, planId, dayType) {
        const plan = data.weekplans[planId];
        const totals = plan.schedule.reduce((sum, slot) => {
            const meal = data.meals[slot.meal];
            if (!meal) return sum;

            const macros = this.getMealMacros(meal, dayType);
            sum.kcal += Number(macros.kcal || 0);
            sum.protein += Number(macros.protein || 0);
            sum.fat += Number(macros.fat || 0);
            sum.carbs += Number(macros.carbs || 0);
            return sum;
        }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });

        return {
            kcal: Number(totals.kcal.toFixed(1)),
            protein: Number(totals.protein.toFixed(1)),
            fat: Number(totals.fat.toFixed(1)),
            carbs: Number(totals.carbs.toFixed(1))
        };
    },

    parseAmount(amount) {
        if (!amount || amount === 'naar smaak') {
            return { raw: amount || '' };
        }

        let match = amount.match(/^(\d+(?:[.,]\d+)?)\s*g\s*\(droog\)$/i);
        if (match) {
            return { value: Number(match[1].replace(',', '.')), unit: 'g droog' };
        }

        match = amount.match(/^(\d+)\s*stuks?\s*\((\d+(?:[.,]\d+)?)\s*g\)$/i);
        if (match) {
            return { value: Number(match[1].replace(',', '.')), unit: 'stuks' };
        }

        match = amount.match(/^(\d+(?:[.,]\d+)?)\s*(g|ml|stuks?)\b/i);
        if (match) {
            return { value: Number(match[1].replace(',', '.')), unit: match[2].toLowerCase() };
        }

        return { raw: amount };
    },

    formatAmount(value, unit, rawValues) {
        if (unit === 'g droog') {
            return `${Utils.formatNumber(Math.round(value))} g droog`;
        }

        if (unit === 'g' || unit === 'ml') {
            return `${Utils.formatNumber(Math.round(value))} ${unit}`;
        }

        if (unit === 'stuk' || unit === 'stuks') {
            return `${Utils.formatNumber(Math.round(value))} stuks`;
        }

        if (rawValues?.length) {
            return rawValues.join(', ');
        }

        return unit || '';
    },

    getShoppingCategory(name) {
        const value = name.toLowerCase();

        if (['perfect whey protein', 'kwark', 'yoghurt', 'skyr', 'mozzarella', 'kaas', 'eiwit'].some(term => value.includes(term))) {
            return 'Zuivel & Eieren';
        }

        if (['ei', 'eieren', 'kip', 'gehakt', 'ham', 'varkenshaas'].some(term => value.includes(term))) {
            return 'Vlees & Eiwit';
        }

        if (['bulgur', 'rijst', 'brood', 'havervlokken', 'macaroni', 'bloemkoolrijst', 'zoete aardappel'].some(term => value.includes(term))) {
            return 'Koolhydraten';
        }

        if (['paprika', 'ui', 'tomaat', 'knoflook', 'champignon', 'courgette', 'taugé', 'komkommer', 'sla'].some(term => value.includes(term))) {
            return 'Groenten';
        }

        if (['appel', 'banaan', 'kiwi', 'mandarijn', 'druiven', 'bosvruchten', 'avocado', 'fruit'].some(term => value.includes(term))) {
            return 'Fruit';
        }

        if (['bonen', 'kikkererwten', 'passata', 'saus', 'sojasaus', 'ketjap', 'ketchup', 'honing', 'mayolijn', 'pindakaas'].some(term => value.includes(term))) {
            return 'Conserven & Saus';
        }

        return 'Kruiden & Vetten';
    },

    createShoppingId(planId, name) {
        return `${planId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    },

    calculateShopping(data, planId) {
        const plan = data.weekplans[planId];
        const aggregated = new Map();

        const addIngredient = (ingredient, multiplier) => {
            if (!ingredient?.name || ingredient.name === 'Water') {
                return;
            }

            const existing = aggregated.get(ingredient.name) || {
                name: ingredient.name,
                value: 0,
                unit: '',
                rawValues: []
            };

            const parsed = this.parseAmount(ingredient.amount);
            if (typeof parsed.value === 'number' && parsed.unit) {
                if (!existing.unit) {
                    existing.unit = parsed.unit;
                }

                if (existing.unit === parsed.unit) {
                    existing.value += parsed.value * multiplier;
                }
            } else if (parsed.raw && !existing.rawValues.includes(parsed.raw)) {
                existing.rawValues.push(parsed.raw);
            }

            aggregated.set(ingredient.name, existing);
        };

        Object.entries(this.dayCounts).forEach(([dayType, count]) => {
            plan.schedule.forEach(slot => {
                const meal = data.meals[slot.meal];
                if (!meal) return;

                this.getMealIngredients(meal, dayType).forEach(ingredient => addIngredient(ingredient, count));
            });
        });

        const grouped = new Map();
        aggregated.forEach(entry => {
            const category = this.getShoppingCategory(entry.name);
            if (!grouped.has(category)) {
                grouped.set(category, []);
            }

            grouped.get(category).push({
                id: this.createShoppingId(planId, entry.name),
                name: entry.name,
                amount: this.formatAmount(entry.value, entry.unit, entry.rawValues)
            });
        });

        const categoryOrder = [
            'Zuivel & Eieren',
            'Vlees & Eiwit',
            'Koolhydraten',
            'Groenten',
            'Fruit',
            'Conserven & Saus',
            'Kruiden & Vetten'
        ];

        return categoryOrder
            .filter(category => grouped.has(category))
            .map(category => ({
                name: category,
                items: grouped.get(category).sort((left, right) => left.name.localeCompare(right.name, 'nl'))
            }));
    }
};

// ========== Meal Plan App (index.html) ==========
const MealApp = {
    data: null,
    dayType: 'training',
    currentPlan: 'plan1',

    async init() {
        Utils.initNavigation();
        try {
            this.data = await Utils.loadData('data/meals.json');
            this.loadSavedPlan();
            this.initWeekplanSelector();
            this.initToggle();
            this.initModal();
            this.render();
        } catch (e) {
            console.error('Failed to load meal data:', e);
        }
    },

    loadSavedPlan() {
        const state = Utils.loadState();
        if (state.currentPlan && this.data.weekplans[state.currentPlan]) {
            this.currentPlan = state.currentPlan;
        }
    },

    savePlan() {
        const state = Utils.loadState();
        state.currentPlan = this.currentPlan;
        Utils.saveState(state);
    },

    initWeekplanSelector() {
        const select = document.getElementById('weekplan-select');
        if (!select || !this.data.weekplans) return;

        // Populate options
        select.innerHTML = Object.entries(this.data.weekplans).map(([id, plan]) => `
            <option value="${id}" ${id === this.currentPlan ? 'selected' : ''}>
                ${Utils.escape(plan.name)}
            </option>
        `).join('');

        // Handle change
        select.addEventListener('change', () => {
            this.currentPlan = select.value;
            this.savePlan();
            this.render();
        });
    },

    initToggle() {
        const buttons = document.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.dayType = btn.dataset.type;
                this.render();
            });
        });
    },

    initModal() {
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.getElementById('modal-close');

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal();
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    },

    getCurrentPlan() {
        return this.data.weekplans[this.currentPlan];
    },

    render() {
        this.renderDayTotals();
        this.renderSchedule();
    },

    renderDayTotals() {
        const macrosEl = document.getElementById('day-macros');
        const labelEl = document.getElementById('day-type-label');
        const targetsEl = document.getElementById('targets-row');

        if (!macrosEl || !this.data) return;

        const totals = DataDerivations.calculatePlanTotals(this.data, this.currentPlan, this.dayType);
        const targets = this.data.targets[this.dayType];

        labelEl.textContent = this.dayType === 'training' ? 'TRAININGSDAG' : 'RUSTDAG';

        macrosEl.innerHTML = `
            <div class="macro-item kcal">
                <span class="macro-value">${Utils.formatNumber(totals.kcal)}</span>
                <span class="macro-label">Kcal</span>
            </div>
            <div class="macro-item carbs">
                <span class="macro-value">${Utils.formatNumber(totals.carbs)}g</span>
                <span class="macro-label">KH</span>
            </div>
            <div class="macro-item fat">
                <span class="macro-value">${Utils.formatNumber(totals.fat)}g</span>
                <span class="macro-label">Vet</span>
            </div>
            <div class="macro-item protein">
                <span class="macro-value">${Utils.formatNumber(totals.protein)}g</span>
                <span class="macro-label">Eiwit</span>
            </div>
        `;

        targetsEl.innerHTML = `
            <span>Doel: ${targets.kcal}</span>
            <span>${targets.carbs}g</span>
            <span>${targets.fat}g</span>
            <span>${targets.protein}g</span>
        `;
    },

    renderSchedule() {
        const scheduleEl = document.getElementById('schedule');
        if (!scheduleEl || !this.data) return;

        const plan = this.getCurrentPlan();

        scheduleEl.innerHTML = plan.schedule.map(slot => {
            const meal = this.data.meals[slot.meal];
            if (!meal) return '';

            const macros = meal.variants
                ? meal.variants[this.dayType].macros
                : meal.macros;

            const fixedClass = slot.fixed ? 'fixed' : '';

            return `
                <article class="meal-card ${fixedClass}" data-meal="${slot.meal}">
                    <div class="meal-time">${slot.time}</div>
                    <div class="meal-info">
                        <h3 class="meal-title">${Utils.escape(meal.title)}</h3>
                        <div class="meal-macros-mini">
                            <span class="kcal">${macros.kcal} kcal</span>
                            <span class="protein">${macros.protein}g eiwit</span>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        scheduleEl.querySelectorAll('.meal-card').forEach(card => {
            card.addEventListener('click', () => {
                const mealId = card.dataset.meal;
                this.openModal(mealId);
            });
        });
    },

    openModal(mealId) {
        const meal = this.data.meals[mealId];
        if (!meal) return;

        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        let ingredientsList = '';
        let variantToggle = '';

        if (meal.variants) {
            const variant = meal.variants[this.dayType];
            variantToggle = `
                <div class="variant-toggle">
                    <button class="variant-btn ${this.dayType === 'training' ? 'active' : ''}" data-variant="training">
                        ${meal.variants.training.label}
                    </button>
                    <button class="variant-btn ${this.dayType === 'rest' ? 'active' : ''}" data-variant="rest">
                        ${meal.variants.rest.label}
                    </button>
                </div>
            `;

            const selectedIngredients = variant.ingredients
                ? variant.ingredients
                : [...(meal.baseIngredients || []), ...(variant.extraIngredients || [])];

            ingredientsList = `
                <ul class="ingredient-list" id="ingredient-list">
                    ${this.renderIngredients(selectedIngredients)}
                </ul>
            `;
        } else if (meal.ingredients) {
            ingredientsList = `
                <ul class="ingredient-list">
                    ${this.renderIngredients(meal.ingredients)}
                </ul>
            `;
        }

        const macros = meal.variants
            ? meal.variants[this.dayType].macros
            : meal.macros;

        content.innerHTML = `
            <header class="recipe-header">
                <h2 class="recipe-title">${Utils.escape(meal.title)}</h2>
                <div class="recipe-time">${meal.time}</div>
            </header>

            ${meal.description ? `<p class="recipe-description">${Utils.escape(meal.description)}</p>` : ''}

            <div class="macro-grid">
                <div class="macro-item kcal">
                    <span class="macro-value" id="modal-kcal">${macros.kcal}</span>
                    <span class="macro-label">Kcal</span>
                </div>
                <div class="macro-item carbs">
                    <span class="macro-value" id="modal-carbs">${macros.carbs}g</span>
                    <span class="macro-label">KH</span>
                </div>
                <div class="macro-item fat">
                    <span class="macro-value" id="modal-fat">${macros.fat}g</span>
                    <span class="macro-label">Vet</span>
                </div>
                <div class="macro-item protein">
                    <span class="macro-value" id="modal-protein">${macros.protein}g</span>
                    <span class="macro-label">Eiwit</span>
                </div>
            </div>

            ${variantToggle}

            ${ingredientsList ? `
                <section class="recipe-section">
                    <h3 class="recipe-section-title">Ingrediënten</h3>
                    ${ingredientsList}
                </section>
            ` : ''}

            ${meal.preparation ? `
                <section class="recipe-section">
                    <h3 class="recipe-section-title">Bereiding</h3>
                    <ol class="prep-list">
                        ${meal.preparation.map(step => `<li class="prep-step">${Utils.escape(step)}</li>`).join('')}
                    </ol>
                </section>
            ` : ''}
        `;

        if (meal.variants) {
            content.querySelectorAll('.variant-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    content.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const variant = btn.dataset.variant;
                    this.updateModalVariant(meal, variant);
                });
            });
        }

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    },

    renderIngredients(ingredients, isExtra = false) {
        if (!ingredients) return '';
        return ingredients.map(ing => `
            <li class="ingredient-item ${isExtra ? 'extra' : ''}">
                <span class="ingredient-name">${Utils.escape(ing.name)}</span>
                <span class="ingredient-amount">${Utils.escape(ing.amount)}</span>
            </li>
        `).join('');
    },

    updateModalVariant(meal, variant) {
        const variantData = meal.variants[variant];
        const macros = variantData.macros;

        document.getElementById('modal-kcal').textContent = macros.kcal;
        document.getElementById('modal-protein').textContent = macros.protein + 'g';
        document.getElementById('modal-fat').textContent = macros.fat + 'g';
        document.getElementById('modal-carbs').textContent = macros.carbs + 'g';

        const list = document.getElementById('ingredient-list');
        if (list) {
            const selectedIngredients = variantData.ingredients
                ? variantData.ingredients
                : [...(meal.baseIngredients || []), ...(variantData.extraIngredients || [])];
            list.innerHTML = this.renderIngredients(selectedIngredients);
        }
    },

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
};

// ========== Macros App (macros.html) ==========
const MacrosApp = {
    data: null,
    dayType: 'training',
    currentPlan: 'plan1',

    async init() {
        Utils.initNavigation();
        try {
            this.data = await Utils.loadData('data/meals.json');
            this.loadSavedPlan();
            this.initWeekplanSelector();
            this.initToggle();
            this.render();
        } catch (e) {
            console.error('Failed to load macros data:', e);
        }
    },

    loadSavedPlan() {
        const state = Utils.loadState();
        if (state.currentPlan && this.data.weekplans[state.currentPlan]) {
            this.currentPlan = state.currentPlan;
        }
    },

    savePlan() {
        const state = Utils.loadState();
        state.currentPlan = this.currentPlan;
        Utils.saveState(state);
    },

    initWeekplanSelector() {
        const select = document.getElementById('weekplan-select');
        if (!select || !this.data.weekplans) return;

        select.innerHTML = Object.entries(this.data.weekplans).map(([id, plan]) => `
            <option value="${id}" ${id === this.currentPlan ? 'selected' : ''}>
                ${Utils.escape(plan.name)}
            </option>
        `).join('');

        select.addEventListener('change', () => {
            this.currentPlan = select.value;
            this.savePlan();
            this.render();
        });
    },

    initToggle() {
        const buttons = document.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.dayType = btn.dataset.type;
                this.render();
            });
        });
    },

    render() {
        const plan = this.data.weekplans[this.currentPlan];
        const targets = this.data.targets[this.dayType];
        const labelEl = document.getElementById('day-type-label');
        const sectionEl = document.getElementById('macros-breakdown');

        if (labelEl) {
            labelEl.textContent = this.dayType === 'training' ? 'TRAININGSDAG' : 'RUSTDAG';
        }

        if (!sectionEl) return;

        const rows = plan.schedule.map(slot => {
            const meal = this.data.meals[slot.meal];
            if (!meal) return '';

            const macros = meal.variants
                ? meal.variants[this.dayType].macros
                : meal.macros;

            const variantLabel = meal.variants
                ? `<span class="variant-badge">${Utils.escape(meal.variants[this.dayType].label)}</span>`
                : '';

            return `
                <div class="macro-row">
                    <span class="macro-row-time">${slot.time}</span>
                    <span class="macro-row-title">${Utils.escape(meal.title)}${variantLabel}</span>
                    <span class="macro-row-val kcal-val">${macros.kcal}</span>
                        <span class="macro-row-val">${macros.carbs}g</span>
                        <span class="macro-row-val">${macros.fat}g</span>
                        <span class="macro-row-val protein-val">${macros.protein}g</span>
                </div>
            `;
        }).join('');

        const totals = DataDerivations.calculatePlanTotals(this.data, this.currentPlan, this.dayType);
        sectionEl.innerHTML = `
            <div class="macro-col-header">
                <span>Tijd</span>
                <span>Gerecht</span>
                <span>Kcal</span>
                <span>KH</span>
                <span>Vet</span>
                <span>Eiwit</span>
            </div>
            <div class="macros-breakdown">
                ${rows}
                <div class="macro-row total-row">
                    <span class="macro-row-time">—</span>
                    <span class="macro-row-title">TOTAAL</span>
                    <span class="macro-row-val kcal-val">${Utils.formatNumber(totals.kcal)}</span>
                        <span class="macro-row-val">${Utils.formatNumber(totals.carbs)}g</span>
                        <span class="macro-row-val">${Utils.formatNumber(totals.fat)}g</span>
                        <span class="macro-row-val protein-val">${Utils.formatNumber(totals.protein)}g</span>
                </div>
                <div class="macro-row target-row">
                    <span class="macro-row-time">—</span>
                    <span class="macro-row-title">DOEL (max)</span>
                    <span class="macro-row-val">${targets.kcal}</span>
                        <span class="macro-row-val">${targets.carbs}g</span>
                        <span class="macro-row-val">${targets.fat}g</span>
                        <span class="macro-row-val">${targets.protein}g</span>
                </div>
            </div>
        `;
    }
};

// ========== Shopping App (shopping.html) ==========
const ShoppingApp = {
    data: null,
    currentPlan: 'plan1',
    checkedItems: new Set(),

    async init() {
        Utils.initNavigation();
        try {
            this.data = await Utils.loadData('data/meals.json');
            this.loadSavedPlan();
            this.loadChecked();
            this.initWeekplanSelector();
            this.render();
            this.initClearButton();
        } catch (e) {
            console.error('Failed to load shopping data:', e);
        }
    },

    loadSavedPlan() {
        const state = Utils.loadState();
        if (state.currentPlan && this.data.weekplans[state.currentPlan]) {
            this.currentPlan = state.currentPlan;
        }
    },

    savePlan() {
        const state = Utils.loadState();
        state.currentPlan = this.currentPlan;
        Utils.saveState(state);
    },

    initWeekplanSelector() {
        const select = document.getElementById('weekplan-select');
        if (!select || !this.data.weekplans) return;

        select.innerHTML = Object.entries(this.data.weekplans).map(([id, plan]) => `
            <option value="${id}" ${id === this.currentPlan ? 'selected' : ''}>
                ${Utils.escape(plan.name)}
            </option>
        `).join('');

        select.addEventListener('change', () => {
            this.currentPlan = select.value;
            this.savePlan();
            this.render();
        });
    },

    getListKey() {
        return `shopping-${this.currentPlan}`;
    },

    loadChecked() {
        const state = Utils.loadState();
        this.checkedItems = new Set(state[this.getListKey()] || []);
    },

    saveChecked() {
        const state = Utils.loadState();
        state[this.getListKey()] = Array.from(this.checkedItems);
        Utils.saveState(state);
    },

    render() {
        this.loadChecked();
        const container = document.getElementById('shopping-lists');
        if (!container || !this.data) return;

        const categories = DataDerivations.calculateShopping(this.data, this.currentPlan);
        if (!categories.length) return;

        let totalItems = 0;
        let checkedCount = 0;

        container.innerHTML = categories.map(category => {
            totalItems += category.items.length;

            return `
                <section class="shopping-category">
                    <h2 class="category-title">${Utils.escape(category.name)}</h2>
                    <ul class="checklist">
                        ${category.items.map(item => {
                const isChecked = this.checkedItems.has(item.id);
                if (isChecked) checkedCount++;
                return `
                                <li class="checklist-item ${isChecked ? 'checked' : ''}"
                                    data-id="${item.id}">
                                    <span class="checklist-checkbox"></span>
                                    <span class="checklist-text">${Utils.escape(item.name)}</span>
                                    <span class="checklist-amount">${Utils.escape(item.amount)}</span>
                                </li>
                            `;
            }).join('')}
                    </ul>
                </section>
            `;
        }).join('');

        this.updateProgress(checkedCount, totalItems);

        container.querySelectorAll('.checklist-item').forEach(item => {
            item.addEventListener('click', () => this.toggleItem(item));
        });
    },

    toggleItem(element) {
        const id = element.dataset.id;
        const isChecked = element.classList.toggle('checked');

        if (isChecked) {
            this.checkedItems.add(id);
        } else {
            this.checkedItems.delete(id);
        }
        this.saveChecked();

        const total = document.querySelectorAll('.checklist-item').length;
        this.updateProgress(this.checkedItems.size, total);
    },

    updateProgress(checked, total) {
        const progressEl = document.getElementById('progress-text');
        if (progressEl) {
            progressEl.textContent = `${checked}/${total} afgevinkt`;
        }
    },

    initClearButton() {
        const clearBtn = document.getElementById('clear-all');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.checkedItems.clear();
                this.saveChecked();
                this.render();
            });
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MealApp, ShoppingApp, Utils };
}
