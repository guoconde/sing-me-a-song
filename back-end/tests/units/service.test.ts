import { jest } from '@jest/globals';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';
import { recommendationService } from '../../src/services/recommendationsService.js';
import { notFoundError } from '../../src/utils/errorUtils.js';
import servicesFactory from '../factories/servicesFactory.js';

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

  it('Should return notFoundError when there arent id recommendations on downvote', () => {
    jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

    expect(async () => {
      await recommendationService.downvote(1);
    }).rejects.toEqual(notFoundError());
  });

  console.log('123');
  it('Should remove recommendation on score is lower then -5 on downvote', async () => {
    const body = servicesFactory()[2];

    jest.spyOn(recommendationRepository, 'find').mockResolvedValue(body);
    jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue(body);

    const remove = jest.spyOn(recommendationRepository, 'remove').mockResolvedValue(null);

    await recommendationService.downvote(body.id);

    expect(remove).toHaveBeenCalledTimes(1);
    expect(recommendationRepository.updateScore).toBeCalledWith(body.id, 'decrement');
    expect(recommendationRepository.remove).toBeCalledWith(body.id);
  });
});
