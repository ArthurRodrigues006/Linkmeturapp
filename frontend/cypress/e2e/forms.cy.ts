describe('Formulários', () => {
  it('deve validar formulário de login', () => {
    cy.visit('/login');
    
    // Tentar submeter formulário vazio
    cy.get('button[type="submit"]').click();
    
    // Verificar se os campos obrigatórios são validados
    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="senha"]').should('have.attr', 'required');
  });

  it('deve validar formulário de cadastro', () => {
    cy.visit('/signup');
    
    // Preencher formulário com dados válidos
    cy.get('input[name="nome"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@exemplo.com');
    cy.get('input[name="telefone"]').type('(11) 99999-9999');
    cy.get('input[name="senha"]').type('senha123');
    cy.get('input[name="confirmarSenha"]').type('senha123');
    cy.get('input[name="empresa"]').type('Empresa Teste');
    
    // Verificar se o formulário aceita os dados
    cy.get('input[name="nome"]').should('have.value', 'João Silva');
    cy.get('input[name="email"]').should('have.value', 'joao@exemplo.com');
    cy.get('input[name="telefone"]').should('have.value', '(11) 99999-9999');
    cy.get('input[name="senha"]').should('have.value', 'senha123');
    cy.get('input[name="confirmarSenha"]').should('have.value', 'senha123');
    cy.get('input[name="empresa"]').should('have.value', 'Empresa Teste');
  });

  it('deve validar confirmação de senha no cadastro', () => {
    cy.visit('/signup');
    
    cy.get('input[name="senha"]').type('senha123');
    cy.get('input[name="confirmarSenha"]').type('senha456');
    cy.get('button[type="submit"]').click();
    
    cy.contains('As senhas não coincidem');
  });

  it('deve validar formato de email', () => {
    cy.visit('/signup');
    
    cy.get('input[name="email"]').type('email-invalido');
    cy.get('input[name="email"]').should('have.attr', 'type', 'email');
  });

  it('deve validar formato de telefone', () => {
    cy.visit('/signup');
    
    cy.get('input[name="telefone"]').should('have.attr', 'type', 'tel');
  });
});
