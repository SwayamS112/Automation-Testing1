import {test,expect} from '@playwright/test';

export default class login{
    constructor(page){
        this.page = page;
        this.username = '#username'
        this.password = '#password'
        this.submitBtn = '#submit-login'
        this.errMsg = '#flash'
    }

    async goto(){
        await this.page.goto('https://practice.expandtesting.com/login');
    }

    async login(username,password){
        await this.page.fill(this.username,username);
        await this.page.fill(this.password,password);
        await this.page.click(this.submitBtn);
    }

    async success(){
        await expect(this.page).toHaveURL('https://practice.expandtesting.com/secure');
    }

    async passwordError(){
        await expect(this.page.locator(this.errMsg)).toContainText("Your password is invalid!");
    }

    async usernameError(){
        await expect(this.page.locator(this.errMsg)).toContainText("Your username is invalid!");
    }
}
