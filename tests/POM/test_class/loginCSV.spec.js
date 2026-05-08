import {test,expect} from '@playwright/test';
// import { readCSV } from '../../utils/readCSV';
import Login from '../page_class/Login.js';
import { readExcel } from '../../utils/readExcel.js';


// const ac = readCSV('./tests/POM/testData/data.csv')
// for(const user of ac){
//     test.skip(`login using CSV data - ${user.email}`,async({page})=>{
//     const login = new Login(page);
    
//     await login.navigation();
//     await login.formfill();
//     await login.entercredentials(user.email,user.password);
//     await login.lclick();
//     await login.verification();
//     })
// }

const users = readExcel('tests/POM/TestData/Login_excel.xlsx')
for(const data2 of users){
    test(`login using excel data - ${data2.email}`,async({page})=>{
    const login = new Login(page);

    await login.navigation();
    await login.formfill();
    await login.entercredentials(data2.email,data2.password);
    await login.lclick();
    await login.verification();
    })
}