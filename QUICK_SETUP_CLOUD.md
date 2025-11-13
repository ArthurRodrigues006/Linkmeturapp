# ⚡ Setup Rápido - PostgreSQL na Nuvem

## 🎯 OPÇÃO MAIS RÁPIDA: NEON (2 minutos)

### 1️⃣ Criar Conta e Banco
1. Acesse: **https://console.neon.tech/signup**
2. Cadastre-se (Google/GitHub)
3. Clique em **"Create Project"**
4. Nome: `linkmetur-db`
5. Database: `linkmetur`
6. Clique em **"Create"**

### 2️⃣ Copiar Connection String
Você verá algo assim:
```
postgresql://linkmetur_owner:npg_abc123@ep-cool-cloud.us-east-2.aws.neon.tech/linkmetur?sslmode=require
```

**COPIE ESSA STRING E ME ENVIE NO CHAT!**

---

## 🔄 O Que Eu Vou Fazer (Automaticamente)

Quando você me enviar a string, eu vou:

1. ✅ Atualizar `.env` com suas credenciais
2. ✅ Configurar Prisma para PostgreSQL
3. ✅ Criar todas as tabelas no banco
4. ✅ Popular apenas com categorias (sem dados de exemplo)
5. ✅ Testar cadastro e login
6. ✅ Deixar tudo funcionando!

**Tempo total: ~2 minutos**

---

## 💾 Backup Local (Quando Quiser)

Depois de tudo funcionando, você pode fazer backup para local:

### Windows PowerShell:
```powershell
# Fazer backup da nuvem
.\scripts\backup-cloud-to-local.ps1

# Restaurar para PostgreSQL local
.\scripts\restore-backup-to-local.ps1 -BackupFile "backups\linkmetur_backup_XXXXX.sql"
```

### Linux/Mac:
```bash
# Fazer backup da nuvem
./scripts/backup-cloud-to-local.sh

# Restaurar para PostgreSQL local
./scripts/restore-backup-to-local.sh backups/linkmetur_backup_XXXXX.sql
```

---

## 🎁 Vantagens

✅ **Rápido:** 2 minutos para configurar  
✅ **Grátis:** 0.5GB storage  
✅ **Backup fácil:** Scripts prontos  
✅ **Migração simples:** Nuvem → Local quando quiser  
✅ **Sem configuração:** Não precisa instalar PostgreSQL agora  

---

## 🚀 BORA LÁ!

**Me envie a connection string que você copiou do Neon e eu configuro tudo!** 🎉

