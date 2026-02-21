import { describe, it, expect, vi, beforeEach } from 'vitest';
// Adjust the import name if your function in dogController.ts is named differently!
import { getDogImage } from '../controllers/dogController'; 
import * as dogService from '../services/dogService'; 

// 1. Mock the entire dogService module so it doesn't make real API calls
vi.mock('../services/dogService');

describe('Dog Controller Tests', () => {
  let req: any;
  let res: any;

  // 2. Set up fake request and response objects before each test
  beforeEach(() => {
    req = {}; // We don't need any request data for this GET route
    res = {
      status: vi.fn().mockReturnThis(), // Allows chaining like res.status(200).json(...)
      json: vi.fn()
    };
    vi.clearAllMocks();
  });

  // TEST 3: Positive Controller Test
  it('Test 3: should return success true and mocked JSON', async () => {
    // A. Create the mock data that the service SHOULD return
    const mockedServiceResponse = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    // B. Force the mocked dogService to return our fake data
    // (If your service function is named getRandomDogImage, change it here too)
    (dogService.getRandomDogImage as any).mockResolvedValue(mockedServiceResponse);

    // C. Call the controller function with our fake req and res
    await getDogImage(req, res);

    // D. Expectations based on the assignment instructions
    // "Expect that JSON returned by the getDogImage function contains success true and mocked JSON"
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResponse
    });
  });

});