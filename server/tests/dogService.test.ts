import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService'; 

// 1. Mock the global fetch function
global.fetch = vi.fn(); 

describe('Dog Service Tests', () => {

  // Clean up mocks after each test so they don't interfere with each other
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  // TEST 1: Positive Test
  it('Test 1: should return dog image on successful fetch', async () => {
    // A. Create the mocked data according to the assignment instructions
    const mockData = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    // B. Tell the mocked fetch how to respond
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    // C. Call your service function
    const result = await getRandomDogImage();

    // D. Write the Expectations
    // - service calls mocked fetch once (using the exact method the assignment asked for)
    expect(global.fetch).toHaveBeenCalledOnce(); 
    // - imageUrl is the same as the message in mocked data
    expect(result.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg"); 
    // - returned status is success
    expect(result.status).toBe("success"); 
  });


  // TEST 2: Negative Test
  it('Test 2: should throw an error on failed fetch', async () => {
    // A. Mock the fetch to return a failure
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    // B & C. Call the service and expect it to reject/throw an error
    // Note: If this fails, check your dogService.ts file for the EXACT error message 
    // and replace "Failed to fetch dog image" with whatever your file says!
    await expect(getRandomDogImage()).rejects.toThrow("Failed to fetch dog image");
  });

});