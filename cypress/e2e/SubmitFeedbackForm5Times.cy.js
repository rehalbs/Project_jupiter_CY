import { ContactPage } from "../support/Pages/ContactPage";
import { HomePage } from "../support/Pages/HomePage";

const contactPage = new ContactPage();
const homePage = new HomePage();

describe('Submit Feedback Form 5 times in sequence with back navigation', () => {
  const forename = 'John';
  const email = 'JP@test.com';
  const message = 'This is a test message.';

  it('should submit contact form 5 times successfully and return to form each time', () => {
    // Navigate to home and contact page first
    return homePage.isSiteUpandRunning('https://jupiter.cloud.planittesting.com/#/')
      .then(() => homePage.navigateToContactPage())
      .then(() => {
        // Chain submissions one after another using a Cypress promise chain
        let chain = Cypress.Promise.resolve();

        for (let i = 1; i <= 5; i++) {
          chain = chain.then(() => {
            cy.log(`Submitting feedback form - Attempt #${i}`);
            console.log(`Submitting feedback form - Attempt #${i}`);

            return contactPage.feedbackFormFill(forename, email, message)
              .then(() => contactPage.clickSubmit())
              .then(() => contactPage.waitForFeedbackConfirmation())
              .then(() => {
                return contactPage.getSuccessMessage()
                  .should('be.visible')
                  .and('contain.text', `Thanks ${forename}`)
                  .and('contain.text', 'we appreciate your feedback');
              })
              .then(() => {
                return homePage.navigateHomePage();
              })
              .then(() => {
                return homePage.navigateToContactPage();
              })
              .then(() => cy.wait(2000)) // Optional wait to ensure the page is ready for the next submission
          });
        }
        //return to home page after all submissions
        chain = chain.then(() => {
          return homePage.navigateHomePage();
        }).then(() => {
          cy.log('All submissions completed, returning to home page');
        });
      });
  });
});

