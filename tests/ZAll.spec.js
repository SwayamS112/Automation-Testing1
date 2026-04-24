const {test,expect} = require("@playwright/test")

test.beforeEach("TEST Automation Practice",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");  
})

test.skip("input fields",async({page})=>{
    await expect(page).toHaveTitle("Automation Testing Practice");
    
    await page.locator("#name").fill("Swayam");

    await page.locator("#email").fill("soodswayam41@gmail.com");

    await page.locator("#phone").fill("+91 9418473400");

    await page.locator("#textarea").fill("1026/1 Kishangarh, Chandigarh 160101");
})

test.skip("Radio Button with male",async({page})=>{
    await page.locator("#male").check();
    await expect(page.locator("#male")).toBeChecked();

    await expect(page.locator("#female")).not.toBeChecked();
})

test.skip("Radio Button with female",async({page})=>{
    await page.locator("#female").check();
    await expect(page.locator("#female")).toBeChecked();

    await expect(page.locator("#male")).not.toBeChecked();
})

test.skip("Single CheckBox",async({page})=>{
    await page.check("#sunday");
    await expect(page.locator("#sunday")).toBeChecked();

    await page.check("#sunday");
    await expect(page.locator("#sunday")).not.toBeChecked();
})

test.skip("Multiple CheckBox",async({page})=>{
    await page.check('#monday');
    await page.check('#wednesday');
    await page.check('#friday');

    await expect(page.locator('#monday')).toBeChecked();
    await expect(page.locator('#wednesday')).toBeChecked();
    await expect(page.locator('#friday')).toBeChecked();
    
    await page.check('#monday');
    await page.check('#wednesday');
    await page.check('#friday');
    
    await expect(page.locator('#monday')).not.toBeChecked();
    await expect(page.locator('#wednesday')).not.toBeChecked();
    await expect(page.locator('#friday')).not.toBeChecked();
})

test.skip("Select All Checkbox",async({page})=>{
    const loc = await page.locator("//*[@class='form-group']//input[@type='checkbox']");
    const count = loc.count()
    for(let i=1;i<=count;i++){
        await loc.nth(i).check();
    }

    for(let i=0;i<count;i++){
        await expect(loc.nth(i)).toBeChecked
    }

    for(let i=0;i<count;i++){
        await loc.nth(i).check();
    }

    for(let i=0;i<count;i++){
        await expect(loc.nth(i)).not.toBeChecked();
    }
})

test.skip("Drop-Down selection",async({page})=>{
    // await page.locator("#country").selectOption('India');
    await page.selectOption('#country' , 'India');
    await expect(page.locator("#contry")).toHaveText("India");
})

test.skip("Drop-down Options check",async({page})=>{
    
    const options = await page.locator('#country' , 'option').textContent();

    await expect(options).toContain("India")
    await expect(options).toContain("France")
    await expect(options).toContain("United States")
})

test.skip("In Multi Selection(Select single) Drop-down",async({page})=>{
    await page.selectOption("#colors", 'red');
    await expect(page.locator('#colors')).toHaveValue('red');
})

test.skip("In Multi Selection(Multiple Section) Drop-down",async({page})=>{
    await page.selectOption('#colors',['red','blue','green'])  // values not the label
    await expect(page.locator('#colors')).toHaveValues(['red','blue','green']);
})

// only used for just execute this test only other will skip by default 
test.skip("In Multi Selection(ALL) Drop-down",async({page})=>{
    const clr = await page.locator("#colors");
    const cnt = clr.count();

    for(let i=0;i<cnt;i++){
        await clr.selectOption(nth(i));
    }

    for(let i=0;i<cnt;i++){
        await expect(clr).toBeChecked()
    }
})

// test("Date picker 1",async({page})=>{
//     await page.click("#datepicker");
//     await page.click("text='14'"); // same month & year
//     await expect(page.locator("#datepicker")).toHaveValue("04/14/2026")
// })

test.skip("Upload single file",async({page})=>{
    await page.locator("#singleFileInput").setInputFiles("tests/files/resume1.pdf");
    await page.click("//*[@id='singleFileForm']//button");
    await expect(page.locator("#singleFileStatus")).toContainText("resume1.pdf");
})

test.skip("Upload Multiple files",async({page})=>{
    await page.locator("#multipleFilesInput").setInputFiles(["tests/files/resume1.pdf","tests/files/testing.pdf"]);
    // await page.click("//*[@id='multipleFilesForm']//button");
    await page.click("#multipleFilesForm button");
    await expect(page.locator("#multipleFilesStatus")).toContainText("resume1.pdf")
    await expect(page.locator("#multipleFilesStatus")).toContainText("testing.pdf")
})

test("Static Web Table",async({})=>{

})