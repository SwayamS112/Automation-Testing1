const {test,expect} = require("@playwright/test");

test('text box',async({page})=>{
    await page.goto("https://automationexercise.com/");

    await page.waitForTimeout(5000);
})