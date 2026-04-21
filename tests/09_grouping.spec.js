const {expect, test}= require("@playwright/test");

test.afterAll("AF",async()=>{
    console.log("After all script");
})

test.beforeAll("BF",async()=>{
    console.log("Before all script");
})

test.afterEach("AE",async()=>{
    console.log("After Each script");
})

test.beforeEach("BE",async()=>{
    console.log("Before Each script");
})

test.describe("Login Group 1",()=>{
test("Login tests 1",()=>{
    console.log("Test 1");
    
})

test("Login tests 2",()=>{
    console.log("Test 2");
    
})
})

test.describe("Login Group 2",()=>{
test("Login tests 3",()=>{
    console.log("Test 3");
    
})

test("Login tests 4",()=>{
    console.log("Test 4");
    
})

})

