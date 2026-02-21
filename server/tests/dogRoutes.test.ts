import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
// Make sure this import matches your controller's exported function
import * as dogController from '../controllers/dogController'; 
// Make sure this matches your route file's export
import dogRoutes from '../routes/dogRoutes'; 

// 1. Mock the controller [cite: 109]
vi.mock('../controllers/dogController');

// 2. Set up a fake Express app to test our routes
const app = express();
app.use(express.json());
// Mount the routes to the fake app (assuming the base path is /api/dogs)
app.use('/api/dogs', dogRoutes); 
// Note: If test 5 specifically requires /api/dog/random instead of /api/dogs/random, 
// we will also mount it just in case!
app.use('/api/dog', dogRoutes); 

describe('Dog Routes Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TEST 4: Positive Route Test [cite: 109]
  it('Test 4: should return 200 and mocked dog image JSON', async () => {
    // A. Mock the controller to return a successful response [cite: 109]
    (dogController.getDogImage as any).mockImplementation((req: any, res: any) => {
      res.status(200).json({
        success: true,
        data: {
          imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
          status: "success"
        }
      });
    });

    // B. Make a GET request to /api/dogs/random [cite: 116]
    const response = await request(app).get('/api/dogs/random');

    // C. Expectations [cite: 117]
    // returned status code is 200 [cite: 118]
    expect(response.status).toBe(200);
    // returned JSON success value is true [cite: 119]
    expect(response.body.success).toBe(true);
    // returned image url contains mocked imageurl [cite: 120]
    expect(response.body.data.imageUrl).toBe("https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg");
  });

  // TEST 5: Negative Route Test [cite: 121]
  it('Test 5: should return 500 and error message', async () => {
    // A. Mock the controller to simulate a server error [cite: 121]
    (dogController.getDogImage as any).mockImplementation((req: any, res: any) => {
      res.status(500).json({
        success: false,
        error: "Failed to fetch dog image: Network error"
      });
    });

    // B. Make a GET request to the endpoint [cite: 130]
    const response = await request(app).get('/api/dog/random');

    // C. Expectations [cite: 131]
    // returned status code is 500 [cite: 132]
    expect(response.status).toBe(500);
    // error is returned [cite: 133]
    expect(response.body.error).toBe("Failed to fetch dog image: Network error");
  });

});