/*
*/
describe('Swag Labs Login & Logout Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully with standard user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('exist');
  });

  it('should not login with locked out user', () => {
    cy.login('lockedOut');
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
  });

  it('should show error for invalid username', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/');
      cy.get('[data-test="username"]').type(users.invalid.username);// or type('invalid_user'); --> without using fixure
      cy.get('[data-test="password"]').type(users.invalid.password);// or type('wrong_password'); --> without using fixure
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });
  });

  it('should show error for invalid password', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/');
      cy.get('[data-test="username"]').type(users.wrongPassword.username); // or type('wrong_password'); --> without using fixure
      cy.get('[data-test="password"]').type(users.wrongPassword.password); // or type('wrong_password'); --> without using fixure
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });
  });

  it('should logout successfully', () => {
    cy.login('standard');
    cy.get('.bm-burger-button').should('be.visible').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
