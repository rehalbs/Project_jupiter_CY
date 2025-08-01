export class ShoppingPage {
  // Verify the Shop page is loaded by checking part URL
  isPageLoaded() {
    return cy.url().should('include', '#/shop');
  }
  // Buy a specific toy by its name and quantity passed as parameters
  buyToys(name, quantity) {
    // Locate the product card by its name and alias it for reuse
    cy.get('.product').contains(name).parents('.product').as('productCard');
    // Click the "Buy" button quantity times
    for (let i = 0; i < quantity; i++) {
      cy.get('@productCard').contains('Buy').click();
    }
  }
}
