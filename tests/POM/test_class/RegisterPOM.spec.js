const {test,expect} = require("@playwright/test");
// const RegistrationPage = require("../page_class/RegisterPOM.js")
import RegistrationPage from "../page_class/RegisterPOM";

test("Register form",async({page})=>{
    const register = new RegistrationPage(page);

    await register.navigator();
    await register.openSignup();
    await register.Register_form();
    await register.buttonF();
})
