export function openModal() {
  cy.get("[data-cy='ingredients']")
    .first()
    .find("[data-cy='ingredients-container']")
    .first()
    .click();
}

export function checkModalVisibility(isVisible: boolean) {
  cy.get("[data-cy='modalWindow']").should(isVisible ? 'exist' : 'not.exist');
}
