import json
from pathlib import Path

p = Path(r'c:/Git/private/mealprep/docs/data/meals.json')
d = json.loads(p.read_text(encoding='utf-8'))
meals = d['meals']
plan = d['weekplans']['plan7']

# Extract all macros from the schedule
print('=== PLAN7 INDIVIDUAL MEAL MACROS ===')
for s in plan['schedule']:
    mid = s['meal']
    m = meals[mid]
    print(f'\n{mid}:')
    if 'variants' in m:
        t = m['variants']['training']['macros']
        r = m['variants']['rest']['macros']
        print(f'  Training: kcal={t.get("kcal")}, p={t.get("protein")}, f={t.get("fat")}, c={t.get("carbs")}')
        print(f'  Rest: kcal={r.get("kcal")}, p={r.get("protein")}, f={r.get("fat")}, c={r.get("carbs")}')
    else:
        macros = m['macros']
        print(f'  Fixed: kcal={macros.get("kcal")}, p={macros.get("protein")}, f={macros.get("fat")}, c={macros.get("carbs")}')

# Calculate totals
train_total = {'kcal': 0, 'protein': 0, 'fat': 0, 'carbs': 0}
rest_total = {'kcal': 0, 'protein': 0, 'fat': 0, 'carbs': 0}

for s in plan['schedule']:
    mid = s['meal']
    m = meals[mid]
    if 'variants' in m:
        for k in train_total:
            train_total[k] += float(m['variants']['training']['macros'].get(k, 0))
            rest_total[k] += float(m['variants']['rest']['macros'].get(k, 0))
    else:
        for k in train_total:
            train_total[k] += float(m['macros'].get(k, 0))
            rest_total[k] += float(m['macros'].get(k, 0))

print('\n=== CALCULATED DAY TOTALS ===')
print(f'Training: kcal={train_total["kcal"]:.1f}, protein={train_total["protein"]:.1f}, fat={train_total["fat"]:.1f}, carbs={train_total["carbs"]:.1f}')
print(f'Rest: kcal={rest_total["kcal"]:.1f}, protein={rest_total["protein"]:.1f}, fat={rest_total["fat"]:.1f}, carbs={rest_total["carbs"]:.1f}')

print('\n=== COMPLIANCE CHECK (vs limits 2900/190/60/400 train, 1880/190/80/100 rest) ===')
train_ok = train_total["kcal"] <= 2900 and train_total["protein"] <= 190 and train_total["fat"] <= 60 and train_total["carbs"] <= 400
rest_ok = rest_total["kcal"] <= 1880 and rest_total["protein"] <= 190 and rest_total["fat"] <= 80 and rest_total["carbs"] <= 100
print(f'Training compliant: {train_ok}')
print(f'Rest compliant: {rest_ok}')
