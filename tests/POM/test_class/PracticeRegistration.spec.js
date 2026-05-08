import {test, expect} from '@playwright/test';
import PracticeRegistration from '../page_class/PracticeRegistration.js'

test.describe("Valid crudentails for login",()=>{
    test("Login 1",async({page})=>{
        const login = new PracticeRegistration(page);

        await login.goto();
        await login.login('practice','123456','123456');
        await login.success();
    })
})

test.describe("Invalid Crudentails for login",()=>{
    test("login2 Blank username",async({page})=>{
        const login = new PracticeRegistration(page);

        await login.goto();
        await login.login('','123456','123456');
        await login.emptyFiledsError();
    })
    test("login3 Blank password",async({page})=>{
        const login = new PracticeRegistration(page);

        await login.goto();
        await login.login('swayam','','');
        await login.emptyFiledsError();
    })
    test("Login4 with different password",async({page})=>{
        const login = new PracticeRegistration(page);

        await login.goto();
        await login.login('Swayam','123456','123');
        await login.passwordNotMatchedError();
    })
})