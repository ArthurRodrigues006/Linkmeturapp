#!/bin/bash

echo "🔧 Corrigindo todos os erros TypeScript..."

# Corrigir propriedades sem inicializadores
find src -name "*.ts" -exec sed -i '' 's/: string;$/= '\'''\'';/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: number;$/= 0;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: boolean;$/= false;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Date;$/= new Date();/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: string\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: number\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: boolean\[\];$/= [];/g' {} \;

# Corrigir tipos nullable
find src -name "*.ts" -exec sed -i '' 's/: string | null;$/= null;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: number | null;$/= null;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: boolean | null;$/= null;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Date | null;$/= null;/g' {} \;

# Corrigir tipos especiais
find src -name "*.ts" -exec sed -i '' 's/: Buffer;$/= Buffer.alloc(0);/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Record<string, string>;$/= {};/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Record<string, any>;$/= {};/g' {} \;

# Corrigir propriedades de relacionamento (usar ! para indicar que serão inicializadas)
find src -name "*.ts" -exec sed -i '' 's/: User;$/!: User;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Corporation;$/!: Corporation;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Contact;$/!: Contact;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Job;$/!: Job;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Server;$/!: Server;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Authentication;$/!: Authentication;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: RequestForProposal;$/!: RequestForProposal;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Proposal;$/!: Proposal;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: JobPhotos;$/!: JobPhotos;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: JobEvaluation;$/!: JobEvaluation;/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: CorporationProfile;$/!: CorporationProfile;/g' {} \;

# Corrigir arrays de relacionamentos
find src -name "*.ts" -exec sed -i '' 's/: User\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Corporation\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Contact\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Job\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: JobPhotos\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: JobEvaluation\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: RequestForProposal\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: Proposal\[\];$/= [];/g' {} \;
find src -name "*.ts" -exec sed -i '' 's/: JobPhotoResponseDto\[\];$/= [];/g' {} \;

echo "✅ Correções aplicadas!"
