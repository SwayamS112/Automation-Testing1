const {test,expect}= require("@playwright/test");

test.beforeEach(async({page})=>{

    await page.goto('https://www.demoblaze.com/');
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("goodboy123");
    await page.locator("#loginpassword").fill("123");
    await page.click("button[onclick='logIn()']");
})

test.afterEach(async({page})=>{
    await page.locator("button[onclick='logOut()']").click();
})

test("Home page",async({page})=>{
    const number = await page.locator('//*[@id="tbodyid"]/div').all();
    console.log("number of products",number.length);
    await expect(number.length).toBe(9);
})