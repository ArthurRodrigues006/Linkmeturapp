# Script de Backup - PostgreSQL Nuvem → Local (Windows PowerShell)
# Uso: .\scripts\backup-cloud-to-local.ps1

param(
    [switch]$Help
)

if ($Help) {
    Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Blue
    Write-Host "║   Backup PostgreSQL - Nuvem → Local       ║" -ForegroundColor Blue
    Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Blue
    Write-Host "Uso: .\scripts\backup-cloud-to-local.ps1`n"
    Write-Host "Este script faz backup do banco PostgreSQL na nuvem"
    Write-Host "e salva localmente para posterior restauração.`n"
    exit 0
}

Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║   Backup PostgreSQL - Nuvem → Local       ║" -ForegroundColor Blue
Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Blue

# Verificar se .env existe
$envFile = "landing page\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ Erro: Arquivo .env não encontrado" -ForegroundColor Red
    exit 1
}

# Carregar variáveis de ambiente
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*DATABASE_URL\s*=\s*"?([^"]+)"?\s*$') {
        $env:DATABASE_URL = $matches[1]
    }
}

if (-not $env:DATABASE_URL) {
    Write-Host "❌ Erro: DATABASE_URL não definida no .env" -ForegroundColor Red
    exit 1
}

# Configurações de backup
$backupDir = "backups"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$backupDir\linkmetur_backup_$timestamp.sql"

# Criar diretório de backup
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

Write-Host "📊 Informações do Backup:" -ForegroundColor Yellow
Write-Host "   Origem: " -NoNewline; Write-Host "PostgreSQL Nuvem" -ForegroundColor Green
Write-Host "   Arquivo: " -NoNewline; Write-Host "$backupFile" -ForegroundColor Blue
Write-Host "   Data/Hora: " -NoNewline; Write-Host "$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Blue
Write-Host ""

# Verificar se pg_dump está disponível
$pgDump = "pg_dump"
if (Test-Path "C:\Program Files\PostgreSQL\17\bin\pg_dump.exe") {
    $pgDump = "C:\Program Files\PostgreSQL\17\bin\pg_dump.exe"
}

try {
    Write-Host "⏳ Fazendo backup do banco na nuvem..." -ForegroundColor Blue
    & $pgDump $env:DATABASE_URL | Out-File -FilePath $backupFile -Encoding UTF8
    
    $fileSize = [math]::Round((Get-Item $backupFile).Length / 1KB, 2)
    Write-Host "✅ Backup criado com sucesso!" -ForegroundColor Green
    Write-Host "   Tamanho: " -NoNewline; Write-Host "${fileSize} KB" -ForegroundColor Blue
    
    Write-Host "`n═══════════════════════════════════════════" -ForegroundColor Yellow
    Write-Host "🎉 Backup Concluído!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════`n" -ForegroundColor Yellow
    
    Write-Host "📝 Próximos passos:" -ForegroundColor Blue
    Write-Host "   1. Para restaurar localmente:"
    Write-Host "      .\scripts\restore-backup-to-local.ps1 -BackupFile `"$backupFile`"`n"
    Write-Host "   2. Para ver backups disponíveis:"
    Write-Host "      Get-ChildItem $backupDir\*.sql`n"
    
} catch {
    Write-Host "❌ Erro ao criar backup: $_" -ForegroundColor Red
    exit 1
}

