describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('Successfully log in user with valid credentials', () => {
    cy.get('#registerForm').find('button[data-auth=login').click();
    cy.get('#loginForm').should('be.visible');
    cy.wait(500);

    cy.get('#loginForm').find('input[name=email]').type(email);
    cy.get('#loginForm').find('input[name=password]').type(password);
    cy.get('#loginForm').find('button[type=submit]').click();
  });
});

const user = 'testUser1234';
const email = 'testMail@stud.noroff.no';
const wrongEmail = 'wrongEmail@st.noroff.no';
const password = 'password1234';
