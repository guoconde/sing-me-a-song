import supertest from 'supertest';
import { prisma } from '../src/database.js';
import app from '../src/app.js';
import { CreateRecommendationData } from '../src/services/recommendationsService.js';
import { prismaDisconnect, truncateTable } from './utils/functionsUtils.js';
import bodyFactory from './factories/bodyFactory.js';

function onStart() {
  beforeEach(truncateTable);
  afterAll(prismaDisconnect);
}

describe('POST /recommendations', () => {
  onStart();

  it('Should return 201 on a valid body', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(201);
  });

  it('Should return 409 on conflit valid body', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    await supertest(app).post('/recommendations').send(body);
    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(409);
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

describe('GET /recommendations', () => {
  onStart();

  it('Should return existent arry on get is done and status 200', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    await prisma.recommendation.create({ data: { ...body } });

    const response = await supertest(app).get('/recommendations');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).not.toBeNull();
  });
});

describe('GET /recommendations/random', () => {
  onStart();

  it('Should return existent object on get a random recommendation', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    const create = await prisma.recommendation.create({ data: { ...body } });

    const response = await supertest(app).get('/recommendations/random');

    expect(response.body).toEqual(create);
  });
});

describe('GET /recommendations/top/:amount', () => {
  onStart();

  it('Should return list of top amount recommendations', async () => {
    const amount = 2;

    const body = bodyFactory();

    await prisma.recommendation.createMany({
      data: [{ ...body[0], score: 10 }, { ...body[1] }, { ...body[2], score: 5 }],
    });

    const response = await supertest(app).get(`/recommendations/top/${amount}`);

    expect(response.body.length).toBeGreaterThanOrEqual(amount);
  });
});

describe('GET /recommendations/:id', () => {
  onStart();

  it('Should return an item by id', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    const create = await prisma.recommendation.create({
      data: { ...body },
    });

    const response = await supertest(app).get(`/recommendations/${create.id}`);

    expect(response.body).toEqual(create);
  });
});

describe('POST /recommendations/:id/upvote', () => {
  onStart();

  it('Should return status 200 on upvote is done', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    const create = await prisma.recommendation.create({
      data: { ...body },
    });

    const response = await supertest(app).post(`/recommendations/${create.id}/upvote`);

    expect(response.status).toEqual(200);
  });

  it('Should return status 404 when unexisting upvote', async () => {
    const id = 0;

    const response = await supertest(app).post(`/recommendations/${id}/upvote`);

    expect(response.status).toEqual(404);
  });
});

describe('POST /recommendations/:id/downvote', () => {
  onStart();

  it('Should return status 200 on downvote is done', async () => {
    const body: CreateRecommendationData = bodyFactory()[0];

    const create = await prisma.recommendation.create({
      data: { ...body },
    });

    const response = await supertest(app).post(`/recommendations/${create.id}/downvote`);

    expect(response.status).toEqual(200);
  });

  it('Should return status 404 when unexisting downvote', async () => {
    const id = 0;

    const response = await supertest(app).post(`/recommendations/${id}/downvote`);

    expect(response.status).toEqual(404);
  });
});
