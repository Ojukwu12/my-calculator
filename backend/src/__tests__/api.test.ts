import request from 'supertest';
import app from '../server';

describe('Calculator API Endpoints', () => {
  describe('POST /api/calculate', () => {
    test('should calculate simple addition', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '2 + 3' })
        .expect(200);

      expect(response.body).toEqual({
        result: 5,
        expression: '2 + 3',
      });
    });

    test('should calculate complex expression', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '(10 + 5) * 2 - 8' })
        .expect(200);

      expect(response.body.result).toBe(22);
    });

    test('should return error for division by zero', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '10 / 0' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('divide by zero');
    });

    test('should return error for invalid expression', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '2 +' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return error for empty expression', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return error for missing expression', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('required');
    });

    test('should handle decimal numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '1.5 + 2.5' })
        .expect(200);

      expect(response.body.result).toBe(4);
    });

    test('should handle negative numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '-5 + 3' })
        .expect(200);

      expect(response.body.result).toBe(-2);
    });

    test('should handle power operations', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '2 ^ 3' })
        .expect(200);

      expect(response.body.result).toBe(8);
    });

    test('should handle modulo operations', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '10 % 3' })
        .expect(200);

      expect(response.body.result).toBe(1);
    });
  });

  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('service', 'calculator-api');
    });
  });

  describe('GET /', () => {
    test('should return API information', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('404 handler', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
});
