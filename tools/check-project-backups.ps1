# Check All Projects Backup Status
# Run this to verify all your C:\Projects are backed up to GitHub

Write-Host "`n🔍 Checking backup status for all projects in C:\Projects...`n" -ForegroundColor Cyan

$projects = Get-ChildItem C:\Projects -Directory
$issues = @()

foreach ($proj in $projects) {
    $hasGit = Test-Path (Join-Path $proj.FullName '.git')
    
    Write-Host "📁 $($proj.Name)" -ForegroundColor Yellow
    
    if (-not $hasGit) {
        Write-Host "   ❌ Not a Git repository - NOT BACKED UP!" -ForegroundColor Red
        $issues += "⚠️ $($proj.Name): Not a Git repository"
        continue
    }
    
    Push-Location $proj.FullName
    
    # Check for remote
    $remote = git remote get-url origin 2>$null
    if (-not $remote) {
        Write-Host "   ❌ No GitHub remote configured - NOT BACKED UP!" -ForegroundColor Red
        $issues += "⚠️ $($proj.Name): No remote repository"
        Pop-Location
        continue
    }
    
    Write-Host "   🔗 Remote: $remote" -ForegroundColor Gray
    
    # Check for uncommitted changes
    $status = git status --porcelain 2>$null
    if ($status) {
        $fileCount = ($status | Measure-Object).Count
        Write-Host "   ⚠️  $fileCount uncommitted file(s)" -ForegroundColor Yellow
        $issues += "⚠️ $($proj.Name): Has uncommitted changes"
    } else {
        Write-Host "   ✅ All changes committed" -ForegroundColor Green
    }
    
    # Check if pushed
    $branch = git branch --show-current 2>$null
    $unpushed = git log origin/$branch..$branch --oneline 2>$null
    if ($unpushed) {
        $commitCount = ($unpushed | Measure-Object).Count
        Write-Host "   ⚠️  $commitCount commit(s) not pushed to GitHub" -ForegroundColor Yellow
        $issues += "⚠️ $($proj.Name): Has unpushed commits"
    } else {
        Write-Host "   ✅ Pushed to GitHub" -ForegroundColor Green
    }
    
    Pop-Location
    Write-Host ""
}

# Summary
Write-Host "`n" + ("="*60) -ForegroundColor Cyan
Write-Host "📊 BACKUP STATUS SUMMARY" -ForegroundColor Cyan
Write-Host ("="*60) -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "`n🎉 All projects are backed up to GitHub!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Found $($issues.Count) issue(s) requiring attention:`n" -ForegroundColor Yellow
    foreach ($issue in $issues) {
        Write-Host "   $issue" -ForegroundColor Yellow
    }
    
    Write-Host "`n💡 Action items:" -ForegroundColor Cyan
    Write-Host "   1. For non-Git folders: run 'git init' and create GitHub repo" -ForegroundColor White
    Write-Host "   2. For uncommitted changes: run 'git add . && git commit'" -ForegroundColor White
    Write-Host "   3. For unpushed commits: run 'git push'" -ForegroundColor White
}

Write-Host "`n" + ("="*60) + "`n" -ForegroundColor Cyan
