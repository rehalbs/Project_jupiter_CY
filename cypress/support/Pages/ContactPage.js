export class ContactPage {
    // Click the Submit button for the Errors to generate
    clickSubmit() {
        return cy.contains('a', 'Submit').click({ force: true });
    }
    // Capture the header message when submitting the form without mandatory fields
    getHeaderError() {
        return cy.contains('We welcome your feedback -').invoke('text');
    }
    // Get all form field validation error messages
getFormErrors() {
  return cy.get('.help-inline.ng-scope').then($els => {
    const errorsArray = $els.toArray()  // <-- convert to native array
      .filter(el => Cypress.$(el).is(':visible'))
      .map(el => el.textContent.trim());
    return errorsArray;
  });
}
    // Fill the Feedback form with Mandatory data
    feedbackFormFill(forename, email, message) {
        return cy.get('#forename').type(forename, { force: true })
            .then(() => cy.get('#email').type(email, { force: true }))
            .then(() => cy.get('#message').type(message, { force: true }));
    }

    // Wait for confirmation popup to appear and disappear - so that same form can be submitted 5 times
    waitForFeedbackConfirmation() {
        return cy.contains('Sending Feedback').should('be.visible')
            .then(() => cy.contains('Sending Feedback', { timeout: 35000 }).should('not.exist'))
            .then(() => cy.wait(2000)); // Optional buffer
    }
    // Get the success message after form submission
    getSuccessMessage() {
        return cy.get('.alert-success');
    }
}

