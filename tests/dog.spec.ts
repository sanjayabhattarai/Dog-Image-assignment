import { test, expect } from '@playwright/test';

// Change this to whatever port your React frontend runs on (usually 5173 for Vite or 3000 for Create React App)
const FRONTEND_URL = 'http://localhost:5173'; 

test.describe('E2E Tests for Dog App', () => {

  // Test 3: Positive E2E test on page load
  test('Test 3: Dog image is retrieved successfully when page is loaded', async ({ page }) => {
    // Goto to the page
    await page.goto(FRONTEND_URL);
    
    // Wait for the image element to be attached to the DOM
    const image = page.locator('img');
    await image.waitFor();

    // Expect that Image has source value
    await expect(image).toHaveAttribute('src', /.*/);
    
    // Expect that Source value starts with https://
    const src = await image.getAttribute('src');
    expect(src?.startsWith('https://')).toBeTruthy();
  });

  // Test 4: Positive E2E test on button click
  test('Test 4: Dog image is retrieved successfully when button is clicked', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    const image = page.locator('img');
    await image.waitFor();

    const button = page.getByRole('button', { name: /GET ANOTHER DOG/i });
    
    // Wait for response, click button and wait API call to be finished
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/dogs/random') && response.status() === 200
    );
    await button.click();
    await responsePromise;

    // Expect that Image has source value
    await expect(image).toHaveAttribute('src', /.*/);
    
    // Expect that Source value starts with https://
    const newSrc = await image.getAttribute('src');
    expect(newSrc?.startsWith('https://')).toBeTruthy();
  });

  // Test 5: Negative E2E test when API call fails
  test('Test 5: Correct behaviour when API call fails', async ({ page }) => {
    // Set route to abort on call and go to the page
    await page.route('**/api/dogs/random', route => route.abort());
    await page.goto(FRONTEND_URL);

    // Page has an element containing word error (use regular expression)
    const errorElement = page.getByText(/error/i);
    
    // Element with error text is visible
    await expect(errorElement).toBeVisible();
  });

});