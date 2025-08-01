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

    navigateToContactPage() {
        return cy.get('#nav-contact a').should('be.visible').click();

    }
    navigateHomePage() {
        return cy.get('#nav-home a').should('be.visible').click();
    }

    // Click the Shopping button to navigate to the Shop page
    navigateToShopPage() {
        return cy.get('a.btn.btn-success.btn-large[href="#/shop"]')
            .should('be.visible')
            .click();
    }

}