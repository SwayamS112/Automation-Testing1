const {test, expect} = require('@playwright/test');

test('login page',async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  
    await page.fill('//*[@name="username"]',"admin");
    await page.fill('//*[@name="password"]','admin123')

    await page.click('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button')
})

test('facebook',async({page})=>{
    await page.goto("https://www.facebook.com/");

    await expect(page.locator("//*[@text()='Log in to Facebook']")).toBeVisible;

    await expect(page.locator("//*[@name()=email]")).toBeVisible;

    await expect(page.locator("//*[@name()=pass]")).toBeVisible

    // await expect(page.locator("//*[contains(@name,'email')]")).toBeVisible

    await expect(page.locator("//*[@class()=x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft and text()='Log in']")).toBeVisible

})

