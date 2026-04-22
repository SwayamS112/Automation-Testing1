export default class RegistrationPage{
    constructor(page){
        this.page = page;
        this.signupLink = '#signin2';
        this.username = "#sign-username";
        this.password = "#sign-password";
        this.button = 'button[onclick="register()"]';
    }

    async navigator(){
        await this.page.goto("https://www.demoblaze.com/");
    }

     async openSignup(){
        await this.page.click(this.signupLink);
    }

    async Register_form(){
        await this.page.locator(this.username).fill('Swayam1211');
        await this.page.locator(this.password).fill('swayam1211');
    }

    async buttonF(){
        await this.page.click(this.button)
    }
}