const {test,expect} = require("@playwright/test");

test("test1@regression",async()=>{
console.log("this is test 1 regression");
})

test("test2@regression",async()=>{
console.log("this is test 2 regression");
})

test("test3@sanity",async()=>{
console.log("this is test 3 sanity");
})

test("test4@sanity",async()=>{
console.log("this is test 4 sanity");
})

test("test5@sanity@regression",async()=>{
    console.log("This is test 5 sanity regression");
})

test.skip("To be failed",async({page})=>{
    console.log("Fail Test");
    test.fail();
    expect(1).toBe(2);
})

test.skip("Due to browser fail",async({browserName})=>{
    console.log("browser fail");
    if(browserName=='chromium'){
        test.fail();
    }
})

