import { HomePage } from "../support/Pages/HomePage";
import { ContactPage } from "../support/Pages/ContactPage";
const homePage = new HomePage();
const contactPage = new ContactPage();

describe('Navigate to the ContactPage from Home Page for Feedback Submission', () => {
  //First navigate to the home page and check that the site is up and running
  //Home page should have a welcome message
  //Check if the shopping button works  
  //Navigate to the contact page
  //Check if the contact page is loaded
  //Submit the form without mandatory fields
  //Capture the error message
  it('Mandatory Fields Check, errors are displayed', () => {
    homePage.isSiteUpandRunning('https://jupiter.cloud.planittesting.com/#/');
    homePage.getWelcomeText().then((text) => {
      expect(text).to.include('Welcome to Jupiter Toys, a magical world for good girls and boys.');
      // Check if the shopping button works
      homePage.isShoppingButtonWorking();
      //navigate to the contact page
      const contpage = homePage.navigateToContactPage();
      // Check if the contact page is loaded
      cy.url().should('include', '/contact');
      //submit the form without mandatory fields
      contactPage.clickSubmit();
      //capture the error message Header and Form errors
      contactPage.getHeaderError().then((headerText) => {
        expect(headerText).to.include('We welcome your feedback -');
        // Wait for form errors to be collected
        contactPage.getFormErrors().then((formErrors) => {
          //extract errors correctly
          const [forenameErr, emailErr, messageErr] = formErrors;
          expect(forenameErr).to.include('Forename is required');
          expect(emailErr).to.include('Email is required');
          expect(messageErr).to.include('Message is required');
          //return to home page
          homePage.navigateHomePage();
        });
      });
    });
  });
});