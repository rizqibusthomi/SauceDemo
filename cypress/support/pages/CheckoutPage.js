class CheckoutPage {
  fillInformation(firstName, lastName, zip) {
    if (firstName) cy.get('[data-test="firstName"]').type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').type(lastName);
    if (zip) cy.get('[data-test="postalCode"]').type(zip);
  }

  continue() {
    cy.get('[data-test="continue"]').click();
  }

  cancel() {
    cy.get('[data-test="cancel"]').click();
  }

  verifyError(message) {
    cy.get('[data-test="error"]').should('contain', message);
  }

  shouldNotProceedToForm() {
    cy.url().should('not.include', 'checkout-step-one');
  }
}

export default new CheckoutPage();