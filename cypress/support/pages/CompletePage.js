class CompletePage {
  verifyCompleteMessage() {
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  }
}

export default new CompletePage();