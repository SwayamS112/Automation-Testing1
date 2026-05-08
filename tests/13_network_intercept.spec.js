import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/client/#/auth/login';
const Email = "kunal00457@gmail.com";
const PASSWORD = 'Kunal00172';

// 🔁 Reusable login
async function login(page) {
  await page.goto(BASE_URL);
  await page.locator('#userEmail').fill(Email);
  await page.locator('#userPassword').fill(PASSWORD);
  await page.locator('#login').click();
  console.log("Login SUCCESSFULLY");
}

// ===============================
// 1️⃣ CONTINUE + LOG REQUEST
// ===============================
test('Log API request', async ({ page }) => {

  await page.route('**/api/ecom/product/get-product-list', route => {
    console.log('Request URL:', route.request().url());
    route.continue();
  });

  await login(page);
});

// ===============================
// 2️⃣ BLOCK REQUEST
// ===============================
test('Block product API', async ({ page }) => {

  await page.route('**/api/ecom/product/get-product-list', route => {
    route.abort();
  });

  await login(page);
  await page.waitForTimeout(3000);
});

// ===============================
// 3️⃣ MODIFY REQUEST
// ===============================
test('Modify request headers', async ({ page }) => {

  await page.route('**/api/ecom/product/get-product-list', route => {

    const request = route.request();

    route.continue({
      headers: {
        ...request.headers(),
        'x-test-header': 'playwright-demo'
      }
    });
  });

  await login(page);
});

// ===============================
// 4️⃣ MOCK RESPONSE (FIXED ✅)
// ===============================
test('Mock product API response', async ({ page }) => {

  await page.route('**/api/ecom/product/get-product-list', route => {

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          {
            "_id": "mock1",
            "productName": "Mock Product 1",
            "productAddedBy": "admin",
            "productCategory": "fashion",
            "productSubCategory": "shirts",
            "productPrice": "999",
            "productImage": "https://via.placeholder.com/150",
            "productDescription": "Mock description"
          },
          {
            "_id": "mock2",
            "productName": "Mock Product 2",
            "productAddedBy": "admin",
            "productCategory": "electronics",
            "productSubCategory": "mobile",
            "productPrice": "1999",
            "productImage": "https://via.placeholder.com/150",
            "productDescription": "Mock description"
          }
        ]
      })
    });
  });

  await login(page);

  // ⏳ Wait for products to render
  await page.waitForSelector('.card-body');

  // ✅ Assertion
  await expect(page.locator('.card-body')).toContainText('Mock Product 1');
});