const {test, expect} = require("@playwright/test");


// Chaining
// test("Login practice test automation",async({page})=>{
//     await page.goto("https://practicetestautomation.com/practice-test-login/");

//     await page.locator('#form').locator('#username').fill('student');
//     await page.locator('#form').locator('#password').fill('Password123')

//     await page.locator('#form').locator('#submit').click()

//     await expect(page.locator('.post-title')).toContainText('Logged in Successfully')
// })

// Filter()
// test("Validate the home button using filter",async({page})=>{
//     await page.goto("https://practicetestautomation.com/practice-test-login/");

//     await page.locator('#menu-primary-items').filter({hasText:'Home'}).click();

//     await expect(page).toHaveURL('https://practicetestautomation.com/')
// })


// test("filter with other",async({page})=>{
//     await page.goto("https://demo.nopcommerce.com/");
//    const product = await page.locator('.item-box').filter({has:page.locator('.product-item')});
//    const cnt = await product.count()
//    expect(cnt).toBeGreaterThan(0);
//    console.log("product with images",cnt);
// })





// test('SignUP check',async({page})=>{
//     await page.goto("https://www.demoblaze.com/")

//     await page.locator('#signin2').click();
//     await page.locator('#sign-username').fill("swayam0909");
//     await page.locator('#sign-password').fill("987654321");

//     await page.click('button[onclick="register()"]')
// })

test('login Check',async({page})=>{
    await page.goto("https://www.demoblaze.com/")

    await page.locator('#login2').click();
    let username = 'swayam';
    let password = '987654321'
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    await page.click("button[onclick='logIn()']");

    const user = (page.locator('#nameofuser'));
    // await expect(user).toBeVisible();
    // await expect(user).toContainText(username);

    const count = await page.locator('#tbodyid .col-lg-4.col-md-6.mb-4').count();
    console.log(count);

    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    const dialogPromise = page.waitForEvent('dialog');
    await page.getByText('Add to cart').click();

    const dialog = await dialogPromise;
    await dialog.accept();
})