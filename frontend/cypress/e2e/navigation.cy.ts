describe('Navegação', () => {
  it('deve navegar entre as páginas principais', () => {
    cy.visit('/');
    
    // Verificar se a página inicial carrega
    cy.contains('Conectando Empresas de Turismo');
    
    // Navegar para login
    cy.contains('Fazer Login').click();
    cy.url().should('include', '/login');
    
    // Voltar para home
    cy.visit('/');
    cy.contains('Conectando Empresas de Turismo');
    
    // Navegar para cadastro
    cy.contains('Começar Agora').click();
    cy.url().should('include', '/signup');
  });

  it('deve redirecionar para login quando acessar páginas protegidas', () => {
    // Tentar acessar dashboard sem estar logado
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
    
    // Tentar acessar jobs sem estar logado
    cy.visit('/jobs');
    cy.url().should('include', '/login');
    
    // Tentar acessar contacts sem estar logado
    cy.visit('/contacts');
    cy.url().should('include', '/login');
  });

  it('deve ter links funcionais na página inicial', () => {
    cy.visit('/');
    
    // Verificar se os botões principais existem e são clicáveis
    cy.get('button').contains('Começar Agora').should('be.visible');
    cy.get('button').contains('Fazer Login').should('be.visible');
    
    // Verificar se os botões redirecionam corretamente
    cy.get('button').contains('Começar Agora').click();
    cy.url().should('include', '/signup');
    
    cy.visit('/');
    cy.get('button').contains('Fazer Login').click();
    cy.url().should('include', '/login');
  });
});
