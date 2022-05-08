import supertest from 'supertest';
import { prisma } from '../src/database.js';
import app from '../src/app.js';
import { CreateRecommendationData } from '../src/services/recommendationsService.js';
import { prismaDisconnect, truncateTable } from './utils/functionsUtils.js';

function onStart() {
  beforeEach(truncateTable);
  afterAll(prismaDisconnect);
}

describe('POST /recommendations', () => {
  onStart();

  it('Should return 201 on a valid body', async () => {
    const body: CreateRecommendationData = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(201);
  });

  it('Should return 409 on conflit valid body', async () => {
    const body: CreateRecommendationData = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

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
    const body: CreateRecommendationData = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

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
    const body: CreateRecommendationData = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

    const create = await prisma.recommendation.create({ data: { ...body } });

    const response = await supertest(app).get('/recommendations/random');

    expect(response.body).toEqual(create);
  });
});

describe('GET /recommendations/top/:amount', () => {
  onStart();

  it('Should return list of top amount recommendations', async () => {
    const amount = 2;

    const bodyScore10 = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
      score: 10,
    };
    const bodyScore0 = {
      name: 'Como ser um usuário Linux Avançado? - O que estudar exatamente?',
      youtubeLink: 'https://www.youtube.com/watch?v=SAbyTbP2bjw',
    };
    const bodyScore05 = {
      name: 'NO, pequeno e LEVE // MSI Modern 14',
      youtubeLink: 'https://www.youtube.com/watch?v=Q5k-vp8OQjE',
    };

    await prisma.recommendation.createMany({
      data: [{ ...bodyScore10 }, { ...bodyScore0 }, { ...bodyScore05 }],
    });

    const response = await supertest(app).get(`/recommendations/top/${amount}`);

    expect(response.body.length).toBeGreaterThanOrEqual(amount);
  });
});

describe('GET /recommendations/:id', () => {
  onStart();

  it('Should return an item by id', async () => {
    const body: CreateRecommendationData = {
      name: '10 Coisas IMPRESSIONANTES Que Encontrei na Internet!!',
      youtubeLink: 'https://www.youtube.com/watch?v=m26jErLd5ds',
    };

    const create = await prisma.recommendation.create({
      data: { ...body },
    });

    const response = await supertest(app).get(`/recommendations/${create.id}`);

    expect(response.body).toEqual(create);
  });
});
