param(
    [string]$Message = "Update portfolio website"
)

Write-Host "Syncing changes to GitHub..." -ForegroundColor Cyan
git add .
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to sync. Everything is up to date!" -ForegroundColor Green
    exit 0
}

git commit -m $Message
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully synced to GitHub! GitHub Pages will automatically update." -ForegroundColor Green
} else {
    Write-Host "Failed to sync changes. Please check errors above." -ForegroundColor Red
}
