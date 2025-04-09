class OverviewPage {
  finish() {
    cy.get('[data-test="finish"]').click();
  }

  cancel() {
    cy.get('[data-test="cancel"]').click();
  }

  verifyItemCount(count) {
    cy.get('.cart_item').should('have.length', count);
  }

  verifyPriceCalculation() {
    let itemTotal = 0;

    cy.get('.inventory_item_price').each(($el) => {
      const price = parseFloat($el.text().replace('$', ''));
      itemTotal += price;
    });

    cy.get('.summary_subtotal_label').invoke('text').then((text) => {
      const subtotal = parseFloat(text.replace('Item total: $', ''));
      expect(subtotal).to.eq(itemTotal);
    });
  }
}

export default new OverviewPage();