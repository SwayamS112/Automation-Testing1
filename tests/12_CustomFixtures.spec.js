import {test as base} from '@playwright/test';

const test = base.extend({
    loginPage:async({page},use)=>{
        await page.goto("https://www.google.com");
        await use(page)
    }
})

export {test}

test('test with custom fixture',async({loginPage})=>{
  await loginPage.getByRole('textbox').fill("Swayam");
})