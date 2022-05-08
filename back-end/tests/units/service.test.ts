import { jest } from '@jest/globals';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import { recommendationService } from '../../src/services/recommendationsService.js';
import { notFoundError } from '../../src/utils/errorUtils';

describe('Recommendations service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should return notFoundError when there arent recommendations on getRandom', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);

    expect(async () => {
      await recommendationService.getRandom();
    }).rejects.toEqual(notFoundError());
  });

  it('Should return notFoundError when there arent id recommendations on upvote', () => {
    jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

    expect(async () => {
      await recommendationService.upvote(1);
    }).rejects.toEqual(notFoundError());
  });
});
