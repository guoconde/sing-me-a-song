import { recommendationRepository } from '../repositories/recommendationRepository.js';

async function resetDatabase() {
  await recommendationRepository.truncate();
}

// eslint-disable-next-line import/prefer-default-export
export { resetDatabase };
