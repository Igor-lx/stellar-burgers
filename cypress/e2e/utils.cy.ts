export function openModal() {
  cy.get("[data-cy='ingredients-bun']")
    .first()
    .find("[data-cy='ingredient-bun']")
    .first()
    .click();
}

export function checkModalVisibility(isVisible: boolean) {
  cy.get("[data-cy='modalWindow']").should(isVisible ? 'exist' : 'not.exist');
}
