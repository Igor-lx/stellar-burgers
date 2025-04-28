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
    cy.get('[data-cy="ingredients"]').should('have.length.at.least', 3);
    cy.wait('@getUser');
  });

  it('Modal Window: открытие и закрытие по кнопке', () => {
    openModal();
    checkModalVisibility(true);

    cy.get("[data-cy='modalWindow']").find('button').click();
    checkModalVisibility(false);
  });

  it('Modal Window: открытие и закрытие по оверлею', () => {
    openModal();
    checkModalVisibility(true);
    cy.get("[data-cy='modalOverlay']").click({ force: true });
    checkModalVisibility(false);
  });
});

/*
  it('Добавление булки и начинки в конструктор', () => {
    // Проверяем начальное состояние
    cy.get('[data-cy="no-bun-top"]').should('exist');
    cy.get('[data-cy="no-bun-bottom"]').should('exist');
    cy.get('[data-cy="no-fillings"]').should('exist');

    // Добавляем  булку и начинки
    cy.get('[data-cy="ingredient-bun"]').first().click();
    cy.get('[data-cy="ingredient-main"]').first().click();
    cy.get('[data-cy="ingredient-sauce"]').first().click();

    // Проверяем
    cy.get('[data-cy="constructor"]').within(() => {
      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
      cy.get('[data-cy="constructor-fillings"]')
        .children()
        .should('have.length', 2);
    });
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    // Сохраняем имя первой начинки
    cy.get('[data-cy="ingredient-main"]').first().as('firstMain');
    cy.get('@firstMain')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((cardName) => {
        // Открываем модалку
        cy.get('@firstMain').find('img').click();

        // Проверяем, что модалка видима и содержит то же имя
        cy.get('[data-cy="modal-window"]').should('be.visible');
        cy.get('[data-cy="ingredient-name"]').should('contain', cardName);

        // Закрываем крестиком
        cy.get('[data-cy="modal-window"] button').click();
        cy.get('[data-cy="modal-window"]').should('not.exist');

        // Открываем вновь и закрываем по оверлею
        cy.get('@firstMain').find('img').click();
        cy.get('[data-cy="modal-window"]').should('be.visible');
        cy.get('[data-cy="modal-overlay"]').click({ force: true });
        cy.get('[data-cy="modal-window"]').should('not.exist');
      });
  });

  it('Процесс создания заказа и очистка конструктора', () => {
    // Добавляем булку и начинку
    cy.get('[data-cy="ingredient-bun"]').first().click();
    cy.get('[data-cy="ingredient-main"]').first().click();

    // Оформляем заказ
    cy.get('[data-cy="order-button"]').should('not.be.disabled').click();

    // Ждём POST и проверяем модалку с номером
    cy.wait('@postOrder');
    cy.get('[data-cy="modal-window"]').should('be.visible');

    // Номер совпадает с мокой
    cy.fixture('order.json')
      .its('order.number')
      .then((num) => {
        cy.get('[data-cy="order-number"]').should('contain', num);
      });

    // Закрываем и проверяем очистку
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal-window"]').should('not.exist');

    cy.get('[data-cy="no-bun-top"]').should('exist');
    cy.get('[data-cy="no-bun-bottom"]').should('exist');
    cy.get('[data-cy="no-fillings"]').should('exist');
  });
 
});
 */
