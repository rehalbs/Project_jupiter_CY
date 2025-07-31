import { ContactPage } from "../support/Pages/ContactPage";
import { HomePage } from "../support/Pages/HomePage";  // ✅ You imported it

const contactPage = new ContactPage();
const homePage = new HomePage(); // ✅ You forgot this line in your version

describe('Smoke Test - Contact Form Submission', () => {
  it('should submit contact form successfully with valid data', () => {
    const forename = 'John';
    const email = 'JP@test.com';
    const message = 'This is a smoke test message.';

    return homePage.isSiteUpandRunning('https://jupiter.cloud.planittesting.com/#/')
      .then(() => homePage.iscontactLinkVisible())
      .then(() => contactPage.feedbackFormFill(forename, email, message))
      .then(() => contactPage.submitFeedbackForm())
      .then(() => contactPage.waitForFeedbackConfirmation())
      .then(() => {
        return contactPage.getSuccessMessage()
          .should('be.visible')
          .and('contain.text', `Thanks ${forename}`)
          .and('contain.text', 'we appreciate your feedback');
      });
  });
});