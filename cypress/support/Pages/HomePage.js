// Homepage class, Navigate to home page check that the Home page is running if not throw error, check Shopping button is working 
export class HomePage {
    // Navigate to th home page a d varify the site is up and running
    isSiteUpandRunning(url) {
        return cy.visit(url).then(() => {
            return cy.get('h1').should('have.text', 'Jupiter Toys');
        });
    }
    // Welcome message Check
    getWelcomeText() {
        //get the welcome text from class lead paragraph p
        return cy.get('p.lead').invoke('text');
    }
    // check the Shopping button is working
    isShoppingButtonWorking() {
        //choping button locator 
        const shopingBtn = cy.get('a.btn.btn-success.btn-large[href="#/shop"]')
        // check the button is visible if not throw error
        if ((!shopingBtn.should('be.visible'))) {
            throw new Error('Shopping button is not visible');
        }
        //check that contact Link is visible
    }
    iscontactLinkVisible() {
        return cy.get('#nav-contact a')
            .should('be.visible')
            .click();
    }
}