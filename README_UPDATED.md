# LinkMeTur - Plataforma de Turismo

## 🎯 Visão Geral

O LinkMeTur é uma plataforma completa para conectar empresas do setor de turismo com prestadores de serviços. A aplicação foi completamente otimizada e todas as funcionalidades estão funcionando corretamente.

## ✨ Funcionalidades Implementadas

### ✅ Autenticação e Autorização
- Login e cadastro de usuários
- Sistema de níveis de acesso (Usuário, Moderador, Admin, Super Admin)
- JWT tokens com refresh automático
- Proteção de rotas

### ✅ Dashboard Completo
- Estatísticas em tempo real
- Ações rápidas funcionais
- Navegação intuitiva
- Design responsivo

### ✅ Gestão de Serviços
- CRUD completo de serviços
- Categorização e subcategorização
- Upload de fotos e vídeos
- Sistema de visualizações
- Publicação/despublicação

### ✅ Gestão de Contatos
- CRUD completo de contatos
- Sistema de favoritos
- Busca avançada
- Organização por empresa

### ✅ Sistema de Notificações
- Notificações em tempo real
- Diferentes tipos de notificação
- Marcar como lida/não lida
- Contador de notificações não lidas

### ✅ Configurações de Perfil
- Edição de dados pessoais
- Alteração de senha
- Upload de avatar
- Gerenciamento de conta

## 🏗️ Arquitetura

### Frontend (Next.js 15)
- **Porta**: 3000
- **Tecnologias**: React 19, TypeScript, Tailwind CSS
- **Hooks personalizados**: useAuth, useApi, useCrud
- **Componentes reutilizáveis**: Loading, ErrorAlert, SuccessAlert
- **SEO otimizado**: Meta tags, Schema.org, Open Graph

### Backend API (NestJS)
- **Porta**: 3001
- **Tecnologias**: NestJS, TypeORM, PostgreSQL
- **Documentação**: Swagger UI
- **Validação**: Class-validator, Class-transformer

### Landing API (NestJS)
- **Porta**: 8081
- **Tecnologias**: NestJS, TypeORM, PostgreSQL, Redis
- **WebSocket**: Socket.IO para notificações em tempo real
- **Autenticação**: JWT com guards e decorators

### Infraestrutura
- **PostgreSQL**: Banco de dados principal
- **Redis**: Cache e sessões
- **Docker**: Containerização dos serviços

## 🚀 Como Executar

### Método Rápido (Recomendado)
```bash
# Executar script de inicialização
./start-dev.sh
```

### Método Manual

1. **Iniciar infraestrutura**:
```bash
docker-compose up -d postgres redis
```

2. **Instalar dependências**:
```bash
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..

# Landing
cd landing && npm install && cd ..
```

3. **Iniciar serviços**:
```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Landing
cd landing && npm run start:dev

# Terminal 3 - Frontend
cd frontend && npm run dev
```

## 📱 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Landing API**: http://localhost:8081
- **Swagger Backend**: http://localhost:3001/docs
- **Swagger Landing**: http://localhost:8081/api

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_LANDING_URL=http://localhost:8081
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### Banco de Dados

O banco de dados será criado automaticamente quando os serviços iniciarem. As tabelas são criadas via TypeORM migrations.

## 🧪 Testes

### Frontend
```bash
cd frontend
npm run lint
npm run type-check
```

### Backend
```bash
cd backend
npm run test
npm run test:e2e
```

### Landing
```bash
cd landing
npm run test
npm run test:e2e
```

## 📊 Melhorias Implementadas

### Performance
- ✅ Hooks personalizados para reutilização de código
- ✅ Lazy loading de componentes
- ✅ Otimização de re-renders
- ✅ Cache de requisições
- ✅ Compressão de assets

### UX/UI
- ✅ Design responsivo em todos os dispositivos
- ✅ Loading states em todas as operações
- ✅ Feedback visual para ações do usuário
- ✅ Mensagens de erro e sucesso claras
- ✅ Navegação intuitiva

### Código
- ✅ TypeScript em todo o projeto
- ✅ Componentes reutilizáveis
- ✅ Hooks customizados
- ✅ Tratamento de erros robusto
- ✅ Validação de dados
- ✅ Documentação de código

### Segurança
- ✅ Validação de entrada em todas as APIs
- ✅ Sanitização de dados
- ✅ CORS configurado corretamente
- ✅ JWT com expiração
- ✅ Guards de autenticação e autorização

## 🐛 Problemas Corrigidos

1. **Botões não funcionais**: Todos os botões agora redirecionam corretamente
2. **Rotas de API**: Configuração correta de proxy no Next.js
3. **Autenticação**: Sistema completo de login/logout funcionando
4. **Código morto**: Removido código não utilizado
5. **Dependências**: Atualizadas e otimizadas
6. **Performance**: Melhorias significativas na velocidade
7. **UX**: Interface mais intuitiva e responsiva

## 📈 Próximos Passos

- [ ] Implementar testes automatizados
- [ ] Adicionar CI/CD
- [ ] Implementar cache Redis no frontend
- [ ] Adicionar PWA capabilities
- [ ] Implementar analytics
- [ ] Adicionar internacionalização

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através de:
- Email: suporte@linkmetur.com.br
- GitHub Issues: [Link para issues]

---

**Desenvolvido com ❤️ pela equipe LinkMeTur**
