# Script de Restauração - Backup → PostgreSQL Local (Windows PowerShell)
# Uso: .\scripts\restore-backup-to-local.ps1 -BackupFile "backups\linkmetur_backup_20250113.sql"

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupFile,
    [switch]$Help
)

if ($Help) {
    Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Blue
    Write-Host "║   Restaurar Backup → PostgreSQL Local     ║" -ForegroundColor Blue
    Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Blue
    Write-Host "Uso: .\scripts\restore-backup-to-local.ps1 -BackupFile <arquivo>`n"
    Write-Host "Exemplo:"
    Write-Host "  .\scripts\restore-backup-to-local.ps1 -BackupFile `"backups\linkmetur_backup_20250113.sql`"`n"
    exit 0
}

Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║   Restaurar Backup → PostgreSQL Local     ║" -ForegroundColor Blue
Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Blue

# Verificar se o arquivo existe
if (-not (Test-Path $BackupFile)) {
    Write-Host "❌ Erro: Arquivo não encontrado: $BackupFile" -ForegroundColor Red
    Write-Host "`nBackups disponíveis:" -ForegroundColor Yellow
    Get-ChildItem "backups\*.sql" -ErrorAction SilentlyContinue | ForEach-Object {
        Write-Host "   - $($_.Name)" -ForegroundColor Cyan
    }
    exit 1
}

# Configurações do PostgreSQL Local
$localHost = "localhost"
$localPort = "5432"
$localDatabase = "linkmetur_local"
$localUser = "linkmetur_user"
$localPassword = "linkmetur_password"

Write-Host "📊 Configurações:" -ForegroundColor Yellow
Write-Host "   Backup: " -NoNewline; Write-Host "$BackupFile" -ForegroundColor Blue
Write-Host "   Destino: " -NoNewline; Write-Host "PostgreSQL Local" -ForegroundColor Green
Write-Host "   Host: " -NoNewline; Write-Host "${localHost}:${localPort}" -ForegroundColor Blue
Write-Host "   Database: " -NoNewline; Write-Host "$localDatabase" -ForegroundColor Blue
Write-Host ""

# Verificar se PostgreSQL local está rodando
Write-Host "🔍 Verificando PostgreSQL local..." -ForegroundColor Blue

$psqlPath = "psql"
if (Test-Path "C:\Program Files\PostgreSQL\17\bin\psql.exe") {
    $psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
}

$env:PGPASSWORD = $localPassword

try {
    $null = & $psqlPath -h $localHost -p $localPort -U postgres -d postgres -c "SELECT 1" 2>&1
    Write-Host "✅ PostgreSQL local está rodando" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL local não está rodando" -ForegroundColor Red
    Write-Host "`n💡 Inicie o PostgreSQL local primeiro:" -ForegroundColor Yellow
    Write-Host "   - Windows Service: Start-Service postgresql-x64-17"
    Write-Host "   - Docker: docker-compose -f docker-compose.dev.yml up -d postgres`n"
    exit 1
}

Write-Host ""

# Criar banco de dados se não existir
Write-Host "📦 Criando banco de dados local..." -ForegroundColor Blue

try {
    # Verificar se banco existe
    $dbExists = & $psqlPath -h $localHost -p $localPort -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$localDatabase'"
    
    if (-not $dbExists) {
        & $psqlPath -h $localHost -p $localPort -U postgres -d postgres -c "CREATE DATABASE $localDatabase OWNER $localUser" 2>&1 | Out-Null
        Write-Host "✅ Banco de dados criado" -ForegroundColor Green
    } else {
        Write-Host "✅ Banco de dados já existe" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Aviso: $_" -ForegroundColor Yellow
}

Write-Host ""

# Restaurar backup
Write-Host "⏳ Restaurando backup..." -ForegroundColor Blue

try {
    $env:PGPASSWORD = $localPassword
    Get-Content $BackupFile | & $psqlPath -h $localHost -p $localPort -U $localUser -d $localDatabase 2>&1 | Out-Null
    
    Write-Host "✅ Backup restaurado com sucesso!" -ForegroundColor Green
    
    Write-Host "`n═══════════════════════════════════════════" -ForegroundColor Yellow
    Write-Host "🎉 Restauração Concluída!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════`n" -ForegroundColor Yellow
    
    Write-Host "📝 String de conexão local:" -ForegroundColor Blue
    Write-Host "   DATABASE_URL=`"postgresql://${localUser}:${localPassword}@${localHost}:${localPort}/${localDatabase}`"`n"
    
    Write-Host "💡 Para usar o banco local:" -ForegroundColor Yellow
    Write-Host "   1. Atualize o .env com a string acima"
    Write-Host "   2. Execute: cd 'landing page'; npm run db:generate"
    Write-Host "   3. Reinicie sua aplicação`n"
    
} catch {
    Write-Host "❌ Erro ao restaurar backup: $_" -ForegroundColor Red
    exit 1
}

