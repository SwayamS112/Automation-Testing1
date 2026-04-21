const {test,expect}= require("@playwright/test");

test.skip("screenShot",async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    await page.screenshot({path:"tests/screenshot/"+Date.now()+'HomePage.png'})
})

test.skip("screenShot full page",async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    await page.screenshot({path:"tests/screenshot/"+Date.now()+'HomePage.png',fullPage:true})
})

test("screenShot of element",async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    await page.locator("//*[@class='list-groupss']").screenshot({path:'tests/screenshot/'+Date.now()+"Particular_Element.png"})
})

