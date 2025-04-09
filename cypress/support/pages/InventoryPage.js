class InventoryPage {
  addItemToCart(itemName) {
    cy.contains('.inventory_item', itemName)
      .find('button')
      .click();
  }

  goToCart() {
    cy.get('.shopping_cart_link').click();
  }
}

export default new InventoryPage();