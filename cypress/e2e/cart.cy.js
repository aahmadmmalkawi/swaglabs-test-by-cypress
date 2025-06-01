describe('Cart Functionality Tests', () => {
  beforeEach(() => {
    cy.login('standard'); // login before each test
  });

  it('should navigate to cart page', () => {
    cy.get('.shopping_cart_link').click(); // click cart icon
    cy.url().should('include', '/cart.html'); // check url contains /cart.html
  });

  it('should show added item in cart', () => {
    cy.get('.inventory_item').first().find('button.btn_primary').click(); // add first item to cart
    cy.get('.shopping_cart_link').click(); // go to cart page
    cy.get('.cart_item').should('have.length', 1); // should be one item in cart
  });
  
  it('should remove item from cart page', () => {
    cy.get('.inventory_item').first().find('button.btn_primary').click(); // add first item to cart
    cy.get('.shopping_cart_link').click(); // open cart page
    cy.get('.cart_item').should('exist'); // item should be in cart
    cy.get('.btn_secondary.cart_button').click(); // remove item
    cy.get('.cart_item').should('not.exist'); // item should be removed
  });
});
