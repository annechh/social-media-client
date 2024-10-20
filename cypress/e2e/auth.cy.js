describe('Authentication', () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it('Successfully log in user with valid credentials', () => {
    cy.showLoginForm();
    cy.loginValidUser();
    cy.clickLoginButton();
  });

  it('Logs out the user', () => {
    cy.showLoginForm();
    cy.loginValidUser();
    cy.clickLoginButton();
    cy.clickLogoutButton();
  });

  it('Fails to log in user with invalid credentials', () => {
    cy.showLoginForm();
    cy.windowAlert();
    cy.loginInvalidUser();
    cy.clickLoginButton();
    cy.expectTokenString();
  });
});
