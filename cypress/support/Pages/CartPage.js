export class CartPage {
  isPageLoaded() {
    cy.url().should('include', '#/cart');
    return cy.get('table.cart-items').should('exist').and('be.visible');
  }

  verifyProductInCart(product) {
    const { name, price, quantity } = product;
    const expectedSubtotal = (price * quantity).toFixed(2);

    cy.get('table.cart-items tbody tr.cart-item')
      .contains('td', name)
      .parent('tr')
      .within(() => {
        // Verify Quantity from input value
        cy.get('td').eq(2).find('input')
          .invoke('val')
          .then(val => {
            expect(val).to.equal(quantity.toString());
            cy.log(`Toy Name is ${name} and bought quantity: ${val}`);
          });

        // Verify Price
        cy.get('td').eq(1).invoke('text').then(text => {
          expect(text.trim()).to.equal(`$${price.toFixed(2)}`);
          cy.log(`Toy Name is ${name} and price: ${text.trim()}`);
        });

        // Verify Subtotal
        cy.get('td').eq(3).invoke('text').then(text => {
          const rawText = text.trim();
          cy.log(`Raw subtotal text for ${name}: "${rawText}"`);

          // Remove anything except digits and dot
          const cleanedText = rawText.replace(/[^0-9.]/g, '');
          cy.log(`Cleaned subtotal text for ${name}: "${cleanedText}"`);

          const subtotal = parseFloat(cleanedText);
          cy.log(`Parsed subtotal for ${name}: ${subtotal}`);

          expect(!isNaN(subtotal), `Subtotal for ${name} should be a number`).to.be.true;
          expect(subtotal.toFixed(2)).to.equal(expectedSubtotal);

          cy.log(`Toy Name is ${name} and    subtotal: ${subtotal.toFixed(2)}`);
        });
      });
  }

  verifyCartTotal(products) {
    // Calculate expected total from fixture data
    const expectedTotal = products
      .reduce((sum, p) => sum + p.price * p.quantity, 0)
      .toFixed(2);

    // Get the displayed total text from the cart page
    cy.get('strong.total').invoke('text').then(text => {
      const totalText = text.trim();
      cy.log(`Raw total text: "${totalText}"`);

      // Remove all characters except digits and decimal point
      const cleanedText = totalText.replace(/[^0-9.]/g, '');
      const displayedTotal = parseFloat(cleanedText).toFixed(2);

      cy.log(`Expected total: $${expectedTotal}`);
      cy.log(`Displayed total: $${displayedTotal}`);

      // Assert that the displayed total matches the expected total
      expect(displayedTotal).to.equal(expectedTotal);
    });
  }
}


