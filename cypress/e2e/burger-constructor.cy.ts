import { openModal, checkModalVisibility } from './utils.cy';

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    cy.visit('/');

    cy.wait('@getIngredients');

    cy.wait('@getUser');
  });

  it('Ingredient modal window: открытие и закрытие по кнопке', () => {
    openModal();
    checkModalVisibility(true);

    cy.get("[data-cy='modalWindow']").find('button').click();
    checkModalVisibility(false);
  });

  it('Ingredient modal window: открытие и закрытие по оверлею', () => {
    openModal();
    checkModalVisibility(true);
    cy.get("[data-cy='modalOverlay']").click({ force: true });
    checkModalVisibility(false);
  });

  it('Добавление ингредиентов в конструктор, создание заказа', () => {
    cy.get('[data-cy="ingredient-bun"]').should('have.length.at.least', 1);
    cy.get('[data-cy="ingredient-main"]').should('have.length.at.least', 1);
    cy.get('[data-cy="ingredient-sauce"]').should('have.length.at.least', 1);

    cy.get('[data-cy="no-bun-top"]').should('exist');
    cy.get('[data-cy="no-fillings"]').should('exist');
    cy.get('[data-cy="no-bun-bottom"]').should('exist');

    cy.get('[data-cy="ingredients-bun"]').find('button').click();
    cy.get('[data-cy="ingredients-main"]').find('button').click();
    cy.get('[data-cy="ingredients-sauce"]').find('button').click();

    cy.get('[data-cy="bun-top"]').should('exist');
    cy.get('[data-cy="fillings"]').should('exist');
    cy.get('[data-cy="bun-bottom"]').should('exist');

    cy.get('[data-cy="burgerConstructor"]')
      .contains('button', 'Оформить заказ')
      .click();

    cy.wait('@postOrder');

    cy.get('[data-cy="modalWindow"]').should('be.visible');

    cy.fixture('order.json')
      .its('order.number')
      .then((orderNumber) => {
        cy.get('[data-cy="orderNumber"]').should('contain', orderNumber);
      });

    cy.get('[data-cy="modalOverlay"]').click({ force: true });
    cy.get('[data-cy="modalWindow"]').should('not.exist');

    cy.get('[data-cy="no-bun-top"]').should('exist');
    cy.get('[data-cy="no-bun-bottom"]').should('exist');
    cy.get('[data-cy="no-fillings"]').should('exist');
  });
});
