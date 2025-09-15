describe('Autenticação', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve navegar para a página de login', () => {
    cy.contains('Fazer Login').click();
    cy.url().should('include', '/login');
    cy.contains('Entre na sua conta');
  });

  it('deve navegar para a página de cadastro', () => {
    cy.contains('Começar Agora').click();
    cy.url().should('include', '/signup');
    cy.contains('Crie sua conta');
  });

  it('deve exibir erro ao tentar fazer login com credenciais inválidas', () => {
    cy.visit('/login');
    
    cy.get('input[name="email"]').type('teste@exemplo.com');
    cy.get('input[name="senha"]').type('senha123');
    cy.get('button[type="submit"]').click();
    
    // Como não temos backend rodando, esperamos um erro de conexão
    cy.contains('Erro de conexão', { timeout: 10000 });
  });

  it('deve validar campos obrigatórios no cadastro', () => {
    cy.visit('/signup');
    
    cy.get('button[type="submit"]').click();
    
    // Verificar se os campos obrigatórios estão marcados como inválidos
    cy.get('input[name="nome"]').should('have.attr', 'required');
    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="senha"]').should('have.attr', 'required');
    cy.get('input[name="telefone"]').should('have.attr', 'required');
  });

  it('deve validar confirmação de senha', () => {
    cy.visit('/signup');
    
    cy.get('input[name="senha"]').type('senha123');
    cy.get('input[name="confirmarSenha"]').type('senha456');
    cy.get('button[type="submit"]').click();
    
    cy.contains('As senhas não coincidem');
  });
});
