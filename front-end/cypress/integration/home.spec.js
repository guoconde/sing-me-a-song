/// <reference types='cypress' />

import recommendationFactory from './factories/recommendationFactory.js';

describe('Home /', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('Should insert recommendations', () => {
    const recommendation = recommendationFactory();
    cy.visit('localhost:3000');

    cy.intercept('POST', '/recommendations').as('getRecommendations');
    cy.insertRecommendation(recommendation[0]);
    cy.contains(recommendation[0].name);

    cy.intercept('POST', '/recommendations').as('getRecommendations2');
    cy.wait('@getRecommendations');
    cy.insertRecommendation(recommendation[1]);
    cy.contains(recommendation[1].name);

    cy.wait('@getRecommendations2');
    cy.insertRecommendation(recommendation[2]);
    cy.contains(recommendation[2].name);

    cy.end();
  });
});
