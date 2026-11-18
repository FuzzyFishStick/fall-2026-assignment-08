import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '../src/app.js';

const request = supertest(app);

// ============================================================
// Health endpoint — example provided, do not modify
// ============================================================
describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const res = await request.get('/health');
    expect(res.statusCode).toEqual(200);
  });
});

// ============================================================
// TODO: Write tests for the add endpoint
// ============================================================
describe('GET /api/v1/add', () => {
  it.todo('should return the sum of two numbers');

  it.todo('should handle negative numbers');

  it.todo('should return 400 if operands are missing');

  it.todo('should return 400 if operands are not numbers');
});

// ============================================================
// TODO: Write tests for the subtract endpoint
// ============================================================
describe('GET /api/v1/subtract', () => {
  it.todo('should return the difference of two numbers');

  it.todo('should handle negative numbers');

  it.todo('should return 400 if operands are missing');

  it.todo('should return 400 if operands are not numbers');
});

// ============================================================
// TODO: Write tests for the multiply endpoint
// ============================================================
describe('GET /api/v1/multiply', () => {
  it.todo('should return the product of two numbers');

  it.todo('should handle negative numbers');

  it.todo('should return 400 if operands are missing');

  it.todo('should return 400 if operands are not numbers');
});

// ============================================================
// TODO: Write tests for the divide endpoint
// ============================================================
describe('GET /api/v1/divide', () => {
  it.todo('should return the quotient of two numbers');

  it.todo('should handle negative numbers');

  it.todo('should return 400 if operands are missing');

  it.todo('should return 400 if operands are not numbers');

  it.todo('should return 400 when b is 0 (division by zero)');
});
