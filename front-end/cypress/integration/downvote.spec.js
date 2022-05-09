import recommendationFactory from './factories/recommendationFactory.js';

describe('downvote /', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('Should test upvote rote', () => {
    const recommendation = recommendationFactory();

    cy.visit('localhost:3000');

    cy.intercept('POST', '/recommendations').as('getRecommendations');
    cy.insertRecommendation(recommendation[0]);
    cy.contains(recommendation[0].name);

    cy.contains(recommendation[0].name)
      .get('article')
      .within(() => {
        cy.get('svg:last-of-type').click();
      });

    cy.contains(-1);

    cy.end();
  });
});
