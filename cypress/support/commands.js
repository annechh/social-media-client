const email = 'testMail@stud.noroff.no';
const wrongEmail = 'wrongEmail_5555@stud.noroff.no';
const password = 'password1234';

Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
  cy.wait(500);
});

Cypress.Commands.add('showLoginForm', () => {
  cy.get('#registerForm').find('button[data-auth=login').click();
  cy.get('#loginForm').should('be.visible');
  cy.wait(500);
});

Cypress.Commands.add('loginValidUser', () => {
  cy.get('#loginForm').find('input[name=email]').type(email);
  cy.get('#loginForm').find('input[name=password]').type(password);
});

Cypress.Commands.add('loginInvalidUser', () => {
  cy.get('#loginForm').find('input[name=email]').type(wrongEmail);
  cy.get('#loginForm').find('input[name=password]').type(password);
});

Cypress.Commands.add('clickLoginButton', () => {
  cy.get('#loginForm').find('button[type=submit]').click();
});

Cypress.Commands.add('clickLogoutButton', () => {
  cy.get('button[data-auth=logout]').click();
});

Cypress.Commands.add('expectTokenString', () => {
  cy.window().then(() => {
    expect(localStorage.getItem('token')).to.be.a('string');
  });
});

Cypress.Commands.add('windowAlert', () => {
  cy.on('window:alert', (text) => {
    expect(text).to.contains(
      'Either your username was not found or your password is incorrect',
    );
  });
});
