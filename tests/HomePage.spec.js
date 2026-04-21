const {test, expect} = require("@playwright/test")
test("Home Title", async ({page})=>{
    await page.goto("https://www.demoblaze.com/");

    const title = await page.title();
    console.log("The title is",title);

    await expect(page).toHaveTitle("STORE");
})

test("Login page Title",async({page})=>{
    await page.goto("https://www.instagram.com/accounts/login/");

    const title = await page.title();
    console.log("the title is: ",title);

    await expect(page).toHaveTitle("Instagram");
})
