const {test, expect} = require('@playwright/test');

test("Login page",async({page})=>{
    await page.goto("https://www.demoblaze.com/");

    await page.click("#login2");
    // await page.locator("id=login2").click()

    await page.fill('#loginusername','goodboy123')
    // or 
    // await page.locator('#loginusername').fill('goodboy123');
    await page.fill('#loginpassword','123')

    await page.click('button[onclick="logIn()"]');
    await expect(page.locator('#nameofuser')).toBeVisible();

    await expect(page.locator('#logout2')).toBeVisible();

    await expect(page.locator('//*[@id="cat"]')).toBeVisible();

    const x = await (page.locator('//*[@id="cat"]').textContent());
    await expect(page.getByText(x)).toBeVisible();
})