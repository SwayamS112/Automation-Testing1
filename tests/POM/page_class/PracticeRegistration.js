import {test,expect} from '@playwright/test';

export default class login{
    constructor(page){
        this.page = page;
        this.username = '#username'
        this.password = '#password'
        this.confirmPassword = '#confirmPassword'
        this.errMsg = '#flash'
    }

    async goto(){
        await this.page.goto('https://practice.expandtesting.com/register');
    }

    async login(username,password,ConfirmPassword){
        await this.page.fill(this.username,username);
        await this.page.fill(this.password,password);
        await this.page.fill(this.confirmPassword,ConfirmPassword);
        await this.page.getByRole('button',{name:'Register'}).click();
    }

    async success(){
        await expect(this.page).toHaveURL('https://practice.expandtesting.com/register');
    }

    async emptyFiledsError(){
        await expect(this.page.locator(this.errMsg)).toContainText("All fields are required.");
    }

    async passwordNotMatchedError(){
        await expect(this.page.locator(this.errMsg)).toContainText("Passwords do not match.");
    }
}