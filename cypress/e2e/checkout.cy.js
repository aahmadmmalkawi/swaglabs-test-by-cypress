describe('Checkout Process Tests', () => {
  beforeEach(() => {
    cy.login('standard'); // login as standard user
    cy.get('.inventory_item').first().find('button').click(); // add first item to cart
    cy.get('#shopping_cart_container').click(); // go to cart page
    cy.get('.checkout_button').click(); // start checkout
  });

  it('should show error if fields are empty', () => {
    cy.get('.btn_primary.cart_button').click(); // continue without filling form
    cy.get('[data-test="error"]').should('contain', 'First Name is required'); // check for error message
  });

  it('should proceed to overview with valid data', () => {
    cy.get('[data-test="firstName"]').type('Ahmad'); // enter first name
    cy.get('[data-test="lastName"]').type('Malkawi'); // enter last name
    cy.get('[data-test="postalCode"]').type('12345'); // enter postal code
    cy.get('[data-test="continue"]').click(); // continue to next step

    cy.url().should('include', '/checkout-step-two.html'); // check url
    cy.get('.summary_info').should('exist'); // verify summary info
  });

  it('should complete the order', () => {
    cy.get('[data-test="firstName"]').type('Ahmad'); // enter first name
    cy.get('[data-test="lastName"]').type('Malkawi'); // enter last name
    cy.get('[data-test="postalCode"]').type('12345'); // enter postal code
    cy.get('[data-test="continue"]').click(); // go to overview
    cy.get('[data-test="finish"]').click(); // finish order

    cy.url().should('include', '/checkout-complete.html'); // check completion url
    cy.get('.complete-header').should('contain', 'Thank you for your order!'); // confirm thank you message
  });
});
