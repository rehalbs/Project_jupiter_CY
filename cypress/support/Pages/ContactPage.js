// cypress/support/pages/ContactPage.js

export class ContactPage {
    // Click the Submit button if it's visible and enabled
    clickSubmit() {
        cy.contains('a', 'Submit').then(($btn) => {
            if (!$btn.is(':visible')) {
                throw new Error('Submit button is not visible');
            }
            if ($btn.is(':disabled')) {
                throw new Error('Submit button is disabled');
            }
            cy.wrap($btn).click();
        });
    }
    // Capture the header message when submitting the form without mandatory fields
    getHeaderError() {
        return cy.contains('We welcome your feedback -').invoke('text');
    }
    // Get all form field validation error messages
    getFormErrors() {
        const errorsArray = [];
        cy.get('.help-inline.ng-scope').each(($el) => {
            if ($el.is(':visible')) {
                errorsArray.push($el.text().trim());
            }
        });
        return cy.wrap(errorsArray);
    }
    //submit the Feedback form
    feedbackFormFill(forename, email, message) {
        cy.get('#forename').type(forename);
        cy.get('#email').type(email);
        cy.get('#message').type(message);
        this.clickSubmit();
    }
    // Submit the form with mandatory fields
    submitFeedbackForm() { }
    //wait for the feedback confirimation pop up to appear annd then disappear
    waitForFeedbackConfirmation() {
        cy.contains('Sending Feedback').should('be.visible');
        cy.contains('Sending Feedback', { timeout: 35000 }).should('not.exist');
        cy.wait(2000); // optional buffer
    }
    getSuccessMessage() {
        return cy.get('.alert-success');
    }


}
