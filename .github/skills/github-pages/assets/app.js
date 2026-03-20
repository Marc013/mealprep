/**
 * GitHub Pages App Utilities
 * Vanilla JavaScript - No dependencies
 *
 * Features:
 * - JSON data loading
 * - LocalStorage persistence
 * - Mobile navigation
 * - Checklist functionality
 */

const App = {
    data: null,
    storageKey: 'app-state',

    /**
     * Initialize the application
     * @param {string} dataUrl - Path to JSON data file
     */
    async init(dataUrl) {
        try {
            await this.loadData(dataUrl);
            this.initNavigation();
            this.render();
            console.log('App initialized');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    },

    /**
     * Load JSON data from file
     * @param {string} url - Path to JSON file
     */
    async loadData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        this.data = await response.json();
        return this.data;
    },

    // ========== Navigation ==========

    initNavigation() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');

        if (toggle && links) {
            toggle.addEventListener('click', () => {
                links.classList.toggle('open');
                toggle.setAttribute('aria-expanded', links.classList.contains('open'));
            });

            // Close menu on link click (mobile)
            links.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    links.classList.remove('open');
                });
            });
        }
    },

    // ========== Rendering ==========

    render() {
        if (!this.data) return;

        // Override in page-specific scripts
        // Example: this.renderOverview(), this.renderShopping()
    },

    /**
     * Render cards to a container
     * @param {string} containerId - Target container ID
     * @param {Array} items - Array of card data
     */
    renderCards(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container || !items) return;

        container.innerHTML = items.map(item => `
            <article class="card fade-in">
                <header class="card-header">
                    <h3 class="card-title">${this.escape(item.title)}</h3>
                    ${item.badge ? `<span class="card-badge">${this.escape(item.badge)}</span>` : ''}
                </header>
                ${item.macros ? this.renderMacros(item.macros) : ''}
                <div class="card-content">
                    ${item.description ? `<p>${this.escape(item.description)}</p>` : ''}
                </div>
            </article>
        `).join('');
    },

    /**
     * Render macro display grid
     * @param {Object} macros - { kcal, protein, fat, carbs }
     */
    renderMacros(macros) {
        return `
            <div class="macro-grid">
                <div class="macro-item kcal">
                    <span class="macro-value">${macros.kcal || 0}</span>
                    <span class="macro-label">Kcal</span>
                </div>
                <div class="macro-item protein">
                    <span class="macro-value">${macros.protein || 0}g</span>
                    <span class="macro-label">Protein</span>
                </div>
                <div class="macro-item fat">
                    <span class="macro-value">${macros.fat || 0}g</span>
                    <span class="macro-label">Fat</span>
                </div>
                <div class="macro-item carbs">
                    <span class="macro-value">${macros.carbs || 0}g</span>
                    <span class="macro-label">Carbs</span>
                </div>
            </div>
        `;
    },

    // ========== Checklist ==========

    /**
     * Render a checklist with LocalStorage persistence
     * @param {string} containerId - Target container ID
     * @param {Array} items - Array of { id, text, amount? }
     * @param {string} listKey - Storage key for this checklist
     */
    renderChecklist(containerId, items, listKey) {
        const container = document.getElementById(containerId);
        if (!container || !items) return;

        const checked = this.getCheckedItems(listKey);

        container.innerHTML = `
            <ul class="checklist">
                ${items.map(item => `
                    <li class="checklist-item ${checked.has(item.id) ? 'checked' : ''}"
                        data-id="${item.id}"
                        data-list="${listKey}">
                        <span class="checklist-checkbox"></span>
                        <span class="checklist-text">${this.escape(item.text)}</span>
                        ${item.amount ? `<span class="checklist-amount">${this.escape(item.amount)}</span>` : ''}
                    </li>
                `).join('')}
            </ul>
        `;

        // Add click handlers
        container.querySelectorAll('.checklist-item').forEach(item => {
            item.addEventListener('click', () => this.toggleChecklistItem(item));
        });
    },

    toggleChecklistItem(element) {
        const id = element.dataset.id;
        const listKey = element.dataset.list;
        const isChecked = element.classList.toggle('checked');

        const checked = this.getCheckedItems(listKey);
        if (isChecked) {
            checked.add(id);
        } else {
            checked.delete(id);
        }
        this.saveCheckedItems(listKey, checked);
    },

    getCheckedItems(listKey) {
        const state = this.loadState();
        return new Set(state[listKey] || []);
    },

    saveCheckedItems(listKey, checkedSet) {
        const state = this.loadState();
        state[listKey] = Array.from(checkedSet);
        this.saveState(state);
    },

    clearChecklist(listKey) {
        const state = this.loadState();
        delete state[listKey];
        this.saveState(state);
    },

    // ========== LocalStorage ==========

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
        } catch (error) {
            console.warn('Failed to save state:', error);
        }
    },

    clearState() {
        localStorage.removeItem(this.storageKey);
    },

    // ========== Utilities ==========

    /**
     * Escape HTML to prevent XSS
     * @param {string} str - String to escape
     */
    escape(str) {
        if (typeof str !== 'string') return str;
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Format number with locale
     * @param {number} num - Number to format
     */
    formatNumber(num) {
        return new Intl.NumberFormat('nl-NL').format(num);
    },

    /**
     * Get current day of week (0 = Monday, 6 = Sunday)
     */
    getCurrentDay() {
        const day = new Date().getDay();
        return day === 0 ? 6 : day - 1; // Convert to Monday-based
    },

    /**
     * Simple template replacement
     * @param {string} template - String with {{placeholders}}
     * @param {Object} data - Key-value pairs for replacement
     */
    template(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data.hasOwnProperty(key) ? this.escape(data[key]) : match;
        });
    }
};

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
