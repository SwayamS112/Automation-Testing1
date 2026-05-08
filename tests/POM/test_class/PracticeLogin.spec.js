import {test, expect} from '@playwright/test';
import PracticeLogin from '../page_class/PracticeLogin.js';

test.describe("Valid crudentails for login",()=>{
    test("Login 1",async({page})=>{
        const login = new PracticeLogin(page);

        await login.goto();
        await login.login('practice','SuperSecretPassword!');
        await login.success();
    })
})

test.describe("Invalid Crudentails for login",()=>{
    test("login2 invalid username",async({page})=>{
        const login = new PracticeLogin(page);

        await login.goto();
        await login.login('Wrong_Username','SuperSecretPassword!');
        await login.usernameError();
    })
    test("Login3 with invalid password",async({page})=>{
        const login = new PracticeLogin(page);

        await login.goto();
        await login.login('practice','Wrong_Password!');
        await login.passwordError();
    })
})