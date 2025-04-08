describe('SauceDemo UI Tests', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('1. Login with valid credentials', () => {
      cy.get('#user-name').type(username);
      cy.get('#password').type(password);
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('2. Login with invalid credentials', () => {
      cy.get('#user-name').type('invalid_user');
      cy.get('#password').type('wrong_password');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });
  
    it('3. Add item to cart', () => {
      cy.login(); // custom command
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  
    it('4. Remove item from cart', () => {
      cy.login();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="remove-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  
    it('5. Check cart contents', () => {
      cy.login();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_item').should('have.length', 1);
    });
  
    it('6. Sort items by price (low to high)', () => {
      cy.login();
      cy.get('[data-test="product-sort-container"]').select('lohi');
      cy.get('.inventory_item_price').first().should('contain', '$7.99');
    });
  
    it('7. Logout from inventory page', () => {
      cy.login();
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('eq', 'https://www.saucedemo.com/');
    });
  
    it('8. Complete checkout process', () => {
      cy.login();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('Tomi');
      cy.get('[data-test="lastName"]').type('Wisono');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="finish"]').click();
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  
    it('9. Display product details', () => {
      cy.login();
      cy.contains('Sauce Labs Backpack').click();
      cy.get('.inventory_details_name').should('contain', 'Sauce Labs Backpack');
      cy.get('.inventory_details_desc').should('exist');
    });
  
    it('10. Login locked out user', () => {
      cy.get('#user-name').type('locked_out_user');
      cy.get('#password').type(password);
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('contain', 'locked out');
    });
  });
  