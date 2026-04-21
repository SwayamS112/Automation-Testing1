const {expect , test} = require("@playwright/test")

test("Test Case 1: Register User",async({page})=>{
    await page.goto("https://automationexercise.com/");

    await expect(page).toHaveURL("https://automationexercise.com/", {
  timeout: 50000
});

    await page.locator("//*[@href='/login']").click();

    const nameInput = page.locator(".signup-form").getByPlaceholder('Name');
    await expect(nameInput).toBeVisible();
    await nameInput.fill("Swayam");

    await expect(page.locator(".signup-form").getByPlaceholder('Email Address')).toBeVisible()
    await page.locator(".signup-form").getByPlaceholder('Email Address').fill("soodswayam41@gmail.com")

    await expect(page.locator("//*[@data-qa='signup-button']")).toBeVisible()
    await expect(page.locator("//*[@data-qa='signup-button']")).toBeEnabled()
    await page.locator("//*[@data-qa='signup-button']").click()

    const Mradio= await page.locator("#id_gender1");
    const Fradio= await page.locator("#id_gender2");

    await Mradio.check();
    await expect(Mradio).toBeChecked();

    await expect(Fradio).not.toBeChecked();

    const name = page.locator("#name");
    await expect(name).toBeVisible()

    const email = page.locator("#email");
    await expect(email).toBeVisible()

    await page.locator("#password").fill("Swayam##123")

    // await page.locator("#days").fill("9");
    // await page.locator("#months").fill("september");
    // await page.locator("#years").fill("2004");
    await page.locator("#newsletter").check();
    await page.locator("#option").check();
    await page.locator("#first_name").fill("Swayam")
    await page.locator("#last_name").fill("Sood")
    await page.locator("#company").fill("BEBO")
    await page.locator("#address1").fill("sujanpur")

    const drop = await page.locator("#contry")
    await drop.selectOption({label:"India"})
    
    await page.locator("#state").fill("Hamirpur")
    await page.locator("#city").fill("Sujanpur")
    await page.locator("#zipcode").fill("176110")
    await page.locator("#mobile_number").fill("9418473400")
    await page.click("//*[@data-qa='create-account']")
})

