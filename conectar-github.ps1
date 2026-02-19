# Script para inicializar Git y preparar conexion con GitHub
# Ejecutar en PowerShell desde esta carpeta (cursor emi)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Usar Git de Program Files si no esta en PATH (tras instalar)
$gitExe = "git"
if (Test-Path "C:\Program Files\Git\bin\git.exe") {
    $gitExe = "C:\Program Files\Git\bin\git.exe"
}

Write-Host "Comprobando Git..." -ForegroundColor Cyan
& $gitExe --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git no encontrado. Cierra y vuelve a abrir la terminal despues de instalar Git, o anade Git al PATH." -ForegroundColor Yellow
    exit 1
}

if (Test-Path .git) {
    Write-Host "Este proyecto ya es un repositorio Git." -ForegroundColor Green
} else {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Cyan
    & $gitExe init
    Write-Host "Repositorio creado." -ForegroundColor Green
}

# Configurar usuario si no esta configurado (opcional)
$name = & $gitExe config --global user.name 2>$null
$email = & $gitExe config --global user.email 2>$null
if (-not $name -or -not $email) {
    Write-Host ""
    Write-Host "Configura tu nombre y email para Git (solo la primera vez):" -ForegroundColor Yellow
    if (-not $name) { $n = Read-Host "Tu nombre (ej: Juan Perez)"; if ($n) { & $gitExe config --global user.name $n } }
    if (-not $email) { $e = Read-Host "Tu email (ej: tu@email.com)"; if ($e) { & $gitExe config --global user.email $e } }
}

# Primer commit si hay archivos y aun no hay commits
$hasCommit = $false
& $gitExe rev-parse HEAD 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) { $hasCommit = $false } else { $hasCommit = $true }
if (-not $hasCommit) {
    & $gitExe add .
    $status = & $gitExe status --short 2>$null
    if ($status) {
        & $gitExe commit -m "Initial commit"
        Write-Host "Primer commit creado." -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== Conectar con GitHub ===" -ForegroundColor Cyan
Write-Host "1. Crea un repositorio nuevo en https://github.com/new (sin README, sin .gitignore)"
Write-Host "2. Luego ejecuta (sustituye TU_USUARIO y NOMBRE_REPO):"
Write-Host "   git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "3. La primera vez que hagas push, Git pedira iniciar sesion en GitHub (navegador o token)."
Write-Host "   Ver mas en: GITHUB_SETUP.md" -ForegroundColor Gray
