class CartPage {
  checkout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();