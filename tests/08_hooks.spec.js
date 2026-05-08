const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("goodboy123");
    await page.locator("#loginpassword").fill("123");
    await page.click("button[onclick='logIn()']");
    
    await expect(page.locator('#logout2')).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await page.locator("button[onclick='logOut()']").click();
});

test("Home page", async ({ page }) => {
    const products = page.locator('#tbodyid .card');
    page.pause();
    await expect(products).toHaveCount(9);
});