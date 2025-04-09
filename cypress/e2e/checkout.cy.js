import LoginPage from '../support/pages/LoginPage';
import InventoryPage from '../support/pages/InventoryPage';
import CartPage from '../support/pages/CartPage';
import CheckoutPage from '../support/pages/CheckoutPage';
import OverviewPage from '../support/pages/OverviewPage';
import CompletePage from '../support/pages/CompletePage';


describe('Checkout Flow - SauceDemo', () => {
  beforeEach(() => {
    cy.visit('/');
    LoginPage.login('standard_user', 'secret_sauce');
  });

  it('Checkout with 1 item', () => {
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', 'Wisono', '12345');
    CheckoutPage.continue();
    OverviewPage.finish();
    CompletePage.verifyCompleteMessage();
  });

  it('Checkout with multiple items', () => {
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', 'Wisono', '12345');
    CheckoutPage.continue();
    OverviewPage.verifyItemCount(2);
    OverviewPage.finish(); 
    CompletePage.verifyCompleteMessage();
  });

  it('Missing first name field', () => {
    InventoryPage.addItemToCart('Sauce Labs Bike Light');
    InventoryPage.goToCart(); 
    CartPage.checkout();
    CheckoutPage.fillInformation('', 'Wisono', '12345');
    CheckoutPage.continue();
    CheckoutPage.verifyError('Error: First Name is required');
  });

  it('Missing last name field', () => {
    InventoryPage.addItemToCart('Sauce Labs Bike Light');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', '', '12345');
    CheckoutPage.continue();
    CheckoutPage.verifyError('Error: Last Name is required');
  });

  it('Missing postal code', () => {
    InventoryPage.addItemToCart('Sauce Labs Bike Light');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', 'Wisono', '');
    CheckoutPage.continue();
    CheckoutPage.verifyError('Error: Postal Code is required');
  });

  it('Cancel from info page', () => {
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.cancel();
    cy.url().should('include', 'cart');
  });

  it('Cancel from overview page', () => {
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', 'Wisono', '12345');
    CheckoutPage.continue();
    OverviewPage.cancel();
    cy.url().should('include', 'inventory');
  });

  it('Price calculation accuracy', () => {
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    InventoryPage.addItemToCart('Sauce Labs Bike Light');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', 'Wisono', '12345');
    CheckoutPage.continue();
    OverviewPage.verifyPriceCalculation();
    OverviewPage.finish();
    CompletePage.verifyCompleteMessage();
  });

  it('Complete checkout as performance glitch user', () => {
    cy.visit('/');
    LoginPage.login('performance_glitch_user', 'secret_sauce');
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    InventoryPage.goToCart();
    CartPage.checkout();
    CheckoutPage.fillInformation('Tomi', 'Wisono', '12345');
    CheckoutPage.continue();
    OverviewPage.finish();
    CompletePage.verifyCompleteMessage();
  });
});
