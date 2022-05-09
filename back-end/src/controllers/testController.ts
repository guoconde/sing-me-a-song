import { Request, Response } from 'express';
import * as testService from '../services/testService.js';

// eslint-disable-next-line import/prefer-default-export
export async function resetDatabase(req: Request, res: Response) {
  await testService.resetDatabase();

  res.sendStatus(200);
}
