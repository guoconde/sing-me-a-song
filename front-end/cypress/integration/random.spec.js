import recommendationFactory from './factories/recommendationFactory.js';

describe('Random /random', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('Should test upvote rote', () => {
    const recommendation = recommendationFactory();

    cy.visit('localhost:3000');

    cy.intercept('POST', '/recommendations').as('getRecommendations');
    cy.insertRecommendation(recommendation[0]);
    cy.contains(recommendation[0].name);

    cy.intercept('GET', '/random').as('getRandom');

    cy.visit('localhost:3000/random');
    cy.wait('@getRandom');

    cy.contains(recommendation[0].name);

    cy.end();
  });
});
