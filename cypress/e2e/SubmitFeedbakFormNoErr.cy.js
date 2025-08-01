import { ContactPage } from "../support/Pages/ContactPage";
import { HomePage } from "../support/Pages/HomePage";  //

const contactPage = new ContactPage();
const homePage = new HomePage(); //

describe('Submit Feedback Form and no errors', () => {
  it('should submit contact form successfully with valid data', () => {
    //Mandatory field data
    const forename = 'John';
    const email = 'JP@test.com';
    const message = 'This is a test message.';
    // Navigate to the home page and check that the site is up and running
    // Fill the contact form with valid data and submit it
    //No errors for Mandatory field - otherwise it will throw error
    // Check if the success message is displayed and confirim that the form was submitted successfully
    return homePage.isSiteUpandRunning('https://jupiter.cloud.planittesting.com/#/')
      .then(() => homePage.navigateToContactPage())
      //Enter the mandatory field data into the Feedback form
      .then(() => contactPage.feedbackFormFill(forename, email, message))
      // Submit the form
      .then(() => contactPage.clickSubmit())
      // Wait for the confirmation message and verify it
      .then(() => contactPage.waitForFeedbackConfirmation())
      // Verify the success message 
      .then(() => {
        //check the success message is displayed and contains the expected text
        return contactPage.getSuccessMessage()
          .should('be.visible')
          .and('contain.text', `Thanks ${forename}`)
          .and('contain.text', 'we appreciate your feedback')
          .then(() => {
            // Navigate back to the contact page to allow for another submission
            return homePage.navigateHomePage();
          });     
      });
  });
});