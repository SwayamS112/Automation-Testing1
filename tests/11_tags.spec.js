const {test,expect} = require("@playwright/test");

test.skip("test1@regression",async()=>{
console.log("this is test 1 regression");
})

test.skip("test2@regression",async()=>{
console.log("this is test 2 regression");
})

test.skip("test3@sanity",async()=>{
console.log("this is test 3 sanity");
})

test.skip("test4@sanity",async()=>{
console.log("this is test 4 sanity");
})

test.skip("test5@sanity@regression",async()=>{
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

