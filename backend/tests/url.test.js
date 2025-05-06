const request = require('supertest');
const app = require('../app'); 

describe('URL Shortener API', () => {
  let shortUrl = '';
  const longUrl = 'https://indicina.co';

  it('should encode a long URL', async () => {
    const res = await request(app)
      .post('/api/encode')
      .send({ longUrl });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('shortUrl');
    shortUrl = res.body.shortUrl;
  });

  it('should decode the short URL back to the original', async () => {
    const res = await request(app)
      .post('/api/decode')
      .send({ shortUrl });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ longUrl });
  });

  it('should return 400 for missing longUrl in encode', async () => {
    const res = await request(app).post('/api/encode').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 for invalid shortUrl in decode', async () => {
    const res = await request(app)
      .post('/api/decode')
      .send({ shortUrl: 'http://short.est/invalidcode' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
