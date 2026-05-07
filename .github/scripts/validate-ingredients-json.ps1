param(
    [string]$FilePath = 'src/ingredients.json'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Normalize-IngredientName {
    param([string]$Name)

    if ([string]::IsNullOrWhiteSpace($Name)) {
        return ''
    }

    $n = $Name.ToLowerInvariant()
    $n = [regex]::Replace($n, '\(.*?\)', '')
    $n = $n -replace '\s*-\s*jumbo', ''
    $n = $n -replace '\s*-\s*lidl', ''
    $n = $n -replace '\s*-\s*ah', ''
    $n = $n -replace '[^a-z0-9%]+', ''
    return $n
}

if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
}

$data = Get-Content $FilePath -Raw | ConvertFrom-Json
$ingredients = @($data.ingredients)
$errors = New-Object System.Collections.Generic.List[string]

if ($null -eq $data.version) { $errors.Add('Missing root field: version') }
if ($null -eq $data.last_updated -or "$($data.last_updated)".Trim() -eq '') { $errors.Add('Missing or empty root field: last_updated') }
if ($null -eq $data.total_ingredients) { $errors.Add('Missing root field: total_ingredients') }
if ($null -eq $data.ingredients) { $errors.Add('Missing root field: ingredients') }

$allowedCategories = @(
    'fruit', 'vegetable', 'protein', 'meat', 'dairy', 'carbs', 'spice', 'sauce', 'legume',
    'oil', 'sweetener', 'spreads', 'seasoning', 'hydration', 'other'
)

$requiredIngredientFields = @('id', 'name', 'category', 'unit', 'macros_per_100g', 'sourcing')
$requiredMacroFields = @('kcal', 'protein', 'fat', 'carbs')
$requiredSourcingFields = @('store', 'availability')

foreach ($ing in $ingredients) {
    foreach ($field in $requiredIngredientFields) {
        if (-not ($ing.PSObject.Properties.Name -contains $field)) {
            $errors.Add("[$($ing.id)] Missing field: $field")
        }
    }

    if ($null -eq $ing.id -or "$($ing.id)".Trim() -eq '') {
        $errors.Add('Ingredient with empty id detected')
    }

    if ($null -eq $ing.name -or "$($ing.name)".Trim() -eq '') {
        $errors.Add("[$($ing.id)] Empty name")
    }

    if ($null -eq $ing.category -or "$($ing.category)".Trim() -eq '') {
        $errors.Add("[$($ing.id)] Empty category")
    }
    elseif ($allowedCategories -notcontains $ing.category) {
        $errors.Add("[$($ing.id)] Unknown category: $($ing.category)")
    }

    if ($null -ne $ing.macros_per_100g) {
        foreach ($m in $requiredMacroFields) {
            if (-not ($ing.macros_per_100g.PSObject.Properties.Name -contains $m)) {
                $errors.Add("[$($ing.id)] Missing macro field: $m")
            }
            elseif ($null -eq $ing.macros_per_100g.$m) {
                $errors.Add("[$($ing.id)] Null macro value: $m")
            }
        }
    }

    if ($null -ne $ing.sourcing) {
        foreach ($s in $requiredSourcingFields) {
            if (-not ($ing.sourcing.PSObject.Properties.Name -contains $s)) {
                $errors.Add("[$($ing.id)] Missing sourcing field: $s")
            }
        }
    }
}

$idDuplicates = $ingredients | Group-Object id | Where-Object { $_.Count -gt 1 }
foreach ($dup in $idDuplicates) {
    $errors.Add("Duplicate id: $($dup.Name)")
}

$nameDuplicates = $ingredients | Group-Object name | Where-Object { $_.Count -gt 1 }
foreach ($dup in $nameDuplicates) {
    $errors.Add("Duplicate name: $($dup.Name)")
}

$normalized = $ingredients | ForEach-Object {
    [PSCustomObject]@{
        id   = $_.id
        name = $_.name
        norm = Normalize-IngredientName -Name $_.name
    }
}

$semanticDuplicates = $normalized | Group-Object norm | Where-Object { $_.Count -gt 1 -and $_.Name -ne '' }
foreach ($dup in $semanticDuplicates) {
    $names = ($dup.Group | Select-Object -ExpandProperty name) -join ' | '
    $errors.Add("Semantic duplicate by normalized name '$($dup.Name)': $names")
}

if ($ingredients.Count -ne [int]$data.total_ingredients) {
    $errors.Add("total_ingredients mismatch: expected $($ingredients.Count), found $($data.total_ingredients)")
}

for ($i = 1; $i -lt $ingredients.Count; $i++) {
    if ([string]::Compare($ingredients[$i - 1].name, $ingredients[$i].name, $true) -gt 0) {
        $errors.Add('ingredients is not sorted alphabetically by name')
        break
    }
}

if ($errors.Count -gt 0) {
    Write-Output "Validation failed for $FilePath"
    Write-Output ''
    foreach ($err in $errors) {
        Write-Output "- $err"
    }
    exit 1
}

Write-Output "Validation passed for $FilePath"
Write-Output "- total_ingredients: $($ingredients.Count)"
Write-Output '- alphabetical sort: OK'
Write-Output '- duplicates: none'
Write-Output '- semantic duplicates: none'
exit 0
