describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  const email = 'testMail@stud.noroff.no';
  const wrongEmail = 'wrongEmail@stud.noroff.no';
  const password = 'password1234';

  it('Successfully log in user with valid credentials', () => {
    cy.get('#registerForm').find('button[data-auth=login').click();
    cy.get('#loginForm').should('be.visible');
    cy.wait(500);

    cy.get('#loginForm').find('input[name=email]').type(email);
    cy.get('#loginForm').find('input[name=password]').type(password);
    cy.get('#loginForm').find('button[type=submit]').click();
  });

  it('Logs out the user', () => {
    cy.get('#registerForm').find('button[data-auth=login').click();
    cy.get('#loginForm').should('be.visible');
    cy.wait(500);

    cy.get('#loginForm').find('input[name=email]').type(email);
    cy.get('#loginForm').find('input[name=password]').type(password);
    cy.get('#loginForm').find('button[type=submit]').click();
    cy.get('button[data-auth=logout]').click();
  });

  it('Fails to log in user with invalid credentials', () => {
    cy.get('#registerForm').find('button[data-auth=login').click();
    cy.get('#loginForm').should('be.visible');
    cy.wait(500);

    cy.get('#loginForm').find('input[name=email]').type(wrongEmail);
    cy.get('#loginForm').find('input[name=password]').type(password);
    cy.get('#loginForm').find('button[type=submit]').click();

    cy.window().then(() => {
      expect(localStorage.getItem('token')).to.be.a('string');
    });

    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        'Either your username was not found or your password is incorrect',
      );
    });
  });
});
