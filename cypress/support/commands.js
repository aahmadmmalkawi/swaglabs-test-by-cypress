Cypress.Commands.add('login', (userType) => {
  cy.fixture('users').then((users) => {
    const user = users[userType];

    if (!user) {
      throw new Error(`User type "${userType}" not found in users.json`);
    }

    cy.visit('/');
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-button"]').click();
  });
});
