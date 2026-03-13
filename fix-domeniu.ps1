$root = "C:\Users\Diaconu Mihai\Documents\Website\Conca-verde"
$files = @(
    "index.html", "cazare.html", "restaurant.html", "evenimente.html",
    "corporate.html", "contact.html", "locatie-activitati.html",
    "galerie.html", "nunta.html", "404.html",
    "politica-confidentialitate.html", "termeni.html",
    "sitemap.xml", "robots.txt"
)

$total = 0
foreach ($f in $files) {
    $path = Join-Path $root $f
    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
        $count = ([regex]::Matches($content, "concaverde\.ro")).Count
        if ($count -gt 0) {
            $newContent = $content -replace "concaverde\.ro", "conca-verde.ro"
            [System.IO.File]::WriteAllText($path, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "  [OK] $f - $count inlocuiri" -ForegroundColor Green
            $total += $count
        } else {
            Write-Host "  [--] $f - deja corect" -ForegroundColor Gray
        }
    }
}
Write-Host ""
Write-Host "Total: $total inlocuiri in $($files.Count) fisiere" -ForegroundColor Yellow
Write-Host ""

# Verificare
Write-Host "Verificare finala..." -ForegroundColor Cyan
$remaining = 0
foreach ($f in $files) {
    $path = Join-Path $root $f
    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
        $count = ([regex]::Matches($content, "concaverde\.ro")).Count
        if ($count -gt 0) {
            Write-Host "  [ATENTIE] $f - inca $count referinte!" -ForegroundColor Red
            $remaining += $count
        }
    }
}
if ($remaining -eq 0) {
    Write-Host "  PERFECT - zero referinte la concaverde.ro ramas!" -ForegroundColor Green
}
