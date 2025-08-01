import { HomePage } from '../support/Pages/HomePage';
import { ShoppingPage } from '../support/pages/ShoppingPage';
import { CartPage } from '../support/Pages/CartPage';

describe('Buy toys from fixture list', () => {
  const homePage = new HomePage();
  const shoppingPage = new ShoppingPage();
  const cartPage = new CartPage();

  let shoppingList = [];

  before(() => {
    // Load fixture once
    cy.fixture('shoppingList').then((data) => {
      shoppingList = data;
    });
  });

  it('should buy toys and verify cart correctly', () => {
    // Visit home page and verify
    homePage.isSiteUpandRunning('https://jupiter.cloud.planittesting.com/');
    
    // Navigate to Shop page and verify loaded
    homePage.navigateToShopPage();
    shoppingPage.isPageLoaded();

    // Buy each toy in quantity from fixture
    shoppingList.forEach((toy) => {
      shoppingPage.buyToys(toy.name, toy.quantity);
    });

    // Go to cart page, force click in case of SPA issues
    cy.get('#nav-cart > a').click({ force: true });

    // Verify cart page loaded with at least one item
    cartPage.isPageLoaded();

    // Verify each product in the cart
    shoppingList.forEach((toy) => {
      cartPage.verifyProductInCart(toy);
    });

    // Verify the cart total matches sum of subtotals
    cartPage.verifyCartTotal(shoppingList);
  });
});


