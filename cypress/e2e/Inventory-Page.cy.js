describe('Inventory Page Tests', () => {
  beforeEach(() => {
    cy.login('standard'); // login before each test
  });

  it('should display all 6 inventory items', () => {
    cy.get('.inventory_item').should('have.length', 6); // check that there are 6 items
  });

  it('should display item details when clicked', () => {
    cy.get('.inventory_item').first().find('.inventory_item_name').click(); // open first item details
    cy.url().should('include', '/inventory-item'); // url should include item path
    cy.get('.inventory_details_name').should('exist'); // item name should be visible
  });

  it('should reset app state', () => {
    cy.get('.inventory_item').first().find('button.btn_primary').click(); // add item to cart
    cy.get('.shopping_cart_badge').should('contain', '1'); // cart should show 1 item

    cy.get('#react-burger-menu-btn').click(); // open burger menu
    cy.get('#reset_sidebar_link').click(); // click reset app state

    cy.get('.shopping_cart_badge').should('not.exist'); // cart should be empty
  });

  it('should sort items by Name (A to Z)', () => {
    cy.get('.product_sort_container').select('Name (A to Z)'); // select sort a-z
    cy.get('.inventory_item_name').should('have.length.at.least', 1).then(($items) => {
      const names = [...$items].map(item => item.innerText);
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sortedNames); // names should be sorted
    });
  });

  it('should sort items by Name (Z to A)', () => {
    cy.get('.product_sort_container').select('Name (Z to A)'); // select sort z-a
    cy.get('.inventory_item_name').should('have.length.at.least', 1).then(($items) => {
      const names = [...$items].map(item => item.innerText);
      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sortedNames); // names should be sorted
    });
  });

  it('should sort items by Price (low to high)', () => {
    cy.get('.product_sort_container').select('Price (low to high)'); // sort price low to high
    cy.get('.inventory_item_price').should('have.length.at.least', 1).then(($prices) => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices); // prices should be sorted
    });
  });

  it('should sort items by Price (high to low)', () => {
    cy.get('.product_sort_container').select('Price (high to low)'); // sort price high to low
    cy.get('.inventory_item_price').should('have.length.at.least', 1).then(($prices) => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices); // prices should be sorted
    });
  });
});
