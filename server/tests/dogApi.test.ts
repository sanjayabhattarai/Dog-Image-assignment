import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

describe('API Tests', () => {

  // Test 1: Positive API test to get random dog image
  it('Test 1: should get a random dog image', async () => {
    // Make get call with request calling /api/dogs/random
    const response = await request(app).get('/api/dogs/random');

    // returned HTTP status is 200
    expect(response.status).toBe(200);
    // success is true
    expect(response.body.success).toBe(true);
    // data is returned
    expect(response.body.data).toBeDefined();
    // data contains imageUrl
    expect(response.body.data.imageUrl).toBeDefined();
    // type of imageUrl is string
    expect(typeof response.body.data.imageUrl).toBe('string');
  });

  // Test 2: Negative test for invalid route
  it('Test 2: should return 404 for invalid route', async () => {
    // Make get request with invalid url
    const response = await request(app).get('/api/dogs/invalid');

    // returned HTTP status is 404
    expect(response.status).toBe(404);
    // returned response contains error message
    expect(response.body.error).toBeDefined();
    
    
    expect(response.body.error).toBe("Route not found"); 
  });

});