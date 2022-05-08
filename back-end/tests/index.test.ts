import supertest from 'supertest';
import app from '../src/app.js';
import { CreateRecommendationData } from '../src/services/recommendationsService.js';
import { prismaDisconnect, truncateTable } from './utils/functionsUtils.js';

describe('POST /recommendations', () => {
  beforeEach(truncateTable);

  afterAll(prismaDisconnect);

  it('Should return 201 on a valid body', async () => {
    const body: CreateRecommendationData = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(201);
  });

  it('Should return 422 when unnamed body', async () => {
    const body = {
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(422);
  });

  it('Should return 422 when without youtubeLink', async () => {
    const body = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
    };

    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(422);
  });

  it('Should return 422 when without body', async () => {
    const response = await supertest(app).post('/recommendations');

    expect(response.status).toEqual(422);
  });
});
