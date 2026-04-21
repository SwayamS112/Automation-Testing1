import { test, expect, chromium } from '@playwright/test';
import { toASCII } from 'node:punycode';

test.skip('has title', async ({ page }) => {
await page.goto('https://testautomationpractice.blogspot.com/');

//   await expect(await page.locator('#firstName')).toBeVisible();
//   await expect(await page.locator('#firstName')).toBeEditable();
//   await expect(await page.locator('#firstName')).toBeEmpty();
//   await expect(await page.locator('#firstName')).toBeEnabled();
  
//   await page.locator('#firstName').fill('JATIN');

//    const male = page.getByRole('radio',{name:'Male'});
// //    const male = page.locator('#gender-radio-1');
//     await male.check();
//     await expect(male).toBeChecked();

//     // const ismale = await male.isChecked();
//     // expect(ismale).toBeTruthy();

//     const female = page.getByRole('radio',{name:'Female',exact: true});
//     await expect(female).not.toBeChecked();

//single check 
    // await page.locator('#hobbies-checkbox-1').check();
    // await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();


    //muklticheck 

    // const chque = page.locator('//*[@type="checkbox"]');
    // const count  = await chque.count();

    // for(let i=0;i<count ;i++){
    //     await chque.nth(i).check();
    // }

    //   for(let i=0;i<count ;i++){
    //     await chque.nth(i).uncheck();
    // }

    // const a = ['#hobbies-checkbox-1','#hobbies-checkbox-3'];
    // for(let x of a){
    //     await page.locator(x).check();
    // }

    //Dropdown 

    //await page.locator('#country').selectOption({label:'India'});
    // await page.locator('#country').selectOption('India');
    // await page.locator('#country').selectOption({value:'uk'});
    // await page.locator('#country').selectOption({index: 1});
    // await page.selectOption("#country",'India');

    // const a = await page.locator('#country option');
    // const count = await a.count();
    // console.log(count);

    // for(let i=0;i<count;i++){
    //       const text = await a.nth(i).textContent();
    // console.log(text);    
    // }

    const options = page.locator('#colors option');
    const count = await options.count();
    console.log(count);
    
    // for(let i=0;i<count;i++){
    //     const cnt = await options.nth(i).textContent();
    //     console.log(cnt);
    // }

    const cnt2 = await page.$$('#colors option')
    console.log(cnt2.length);
    for(let i=0;i<cnt2.length;i++){
        const text = await (cnt2[i].textContent())
        console.log(text);
    }
});

test.skip('Alert with ok',async({page})=>{

   await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("I am a JS Alert")
        await dialog.accept();

    page.getByRole('button',{name:'Click for JS Alert'}).click();
    await expect(page.locator('#result')).toContainText("You successfully clicked an alert")
    })
})

test.skip('Alert with text',async({page})=>{

   await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain("prompt");
        expect(dialog.message()).toContain("I am a JS prompt")
        await dialog.accept("Hi my name is swayam......");

    page.getByRole('button',{name:'Click for JS Prompt'}).click();
    await expect(page.locator('#result')).toContainText("You entered: Hi my name is swayam......")
    })
})

test.skip('Alert with Cancel',async({page})=>{
    
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain("I am a JS Confirm");
        await dialog.dismiss();
    })

    await page.getByRole('button',{name:'Click for JS Confirm'}).click();
    await expect(page.locator("#result").toContain("You clicked: Cancel"));
})

test.skip('page Context-1',async({page})=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const Plen=context.pages();
    console.log(Plen.length);

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");

    await page2.goto("https://orangehrm.com/");
    await expect(page2).toHaveURL("https://orangehrm.com/");
})

test.skip("Frames",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frames = page.frames();
    console.log(frames.length);

    const frame1 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'});
    await frame1.locator('//input[@name="mytext1"]').fill("Hi.....My name is swayam");

    const frame2 = await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_2.html"});
    await frame2.locator('//input[@name="mytext2"]').fill("Hi.....My name is swayam");

    const frame4 = page.frameLocator("//*[@src='frame_4.html']").locator("//*[@name='mytext4']");
    await frame4.fill("Hi.....My name is swayam");

    const frame3 = await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
    const childframe = await frame3.childFrames();
    await  childframe[0].locator("//*[@id='i9']").click()

    await  childframe[0].locator("//*[@id='i21']").click()
    await  childframe[0].locator("//*[@id='i24']").click()
});

test.skip("Static Web Table",async({page})=>{
    page.goto("https://testautomationpractice.blogspot.com/?m=1")

    const table = await page.locator("//*[@name='BookTable']");
    
    // no of col
    const col = await table.locator('tbody tr th');
    const total_col = await col.count();
    console.log(total_col);

    // no of row
    const row = await table.locator('tbody tr').count();
    console.log(row);

    console.log("totall number of data",row*total_col);
    
})

test.skip("Drag and drop",async({page})=>{
    page.goto("https://www.qa-practice.com/elements/dragndrop/images")
});

test('test', async ({ page }) => {
  await page.goto('https://www.qa-practice.com/elements/checkbox/mult_checkbox');
  await page.getByRole('checkbox', { name: 'One' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('checkbox', { name: 'One' }).check();
  await page.getByRole('checkbox', { name: 'Two' }).check();
  await page.getByRole('checkbox', { name: 'Three' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('one, two, three').click();
});