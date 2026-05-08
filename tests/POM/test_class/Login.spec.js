import { test } from '@playwright/test';

import Login from '../page_class/Login.js';
import data from '../testData/LoginData.json'

const testData = [
    {
        email : "soodswayam41@gmail.com",
        password:"123456"
    },
    {
        email:"wrong@test.com",
        password:"test123"
    }
];
for(const data of testData){
test.skip(`U Login - ${data.email}`,async({page})=>{

    const login = new Login(page);

    await login.navigation();
    await login.formfill();
    await login.entercredentials(data.email,data.password);
    await login.lclick();
    await login.verification();

});
}



// Using Json Data

// for(const data2 of data){
//     test.skip(`login using json data - ${data2.email}`,async({page})=>{
//     const login = new Login(page);

//     await login.navigation();
//     await login.formfill();
//     await login.entercredentials(data2.email,data2.password);
//     await login.lclick();
//     await login.verification();
//     })
// }

