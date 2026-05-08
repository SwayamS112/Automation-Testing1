//INGTERCEPT _ netwroking 

import {test,expect} from '@playwright/test';
const  BASE_URL = 'https://rahulshettyacademy.com/client/#/auth/login';
const Email = "kunal00457@gmail.com";
const PASSWORD = 'Kunal00172';

const ORDERS_API = "**/api/ecom/order/get-orders-for-customer/**";
// **/api/ecom/order/get-orders-for-customer/**
const MOCK_ORDERS = {
    "data": [
        {
            "_id": "69f31ab",
            "orderById": "691a6594fb64",
            "orderBy": "jatingarg740@gmail.com",
            "productOrderedId": "Thu Apr 30",
            "productName": "GUCCI COAT 3",
            "country": "India",
            "productDescription": "Iphone 17 PRO MAX",
            // "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959232316.jpeg",
            "orderDate": null,
            "orderPrice": "115000",
        },
        {
            "_id": "69f31ab00b6",
            "orderById": "69fa6594fb64",
            "orderBy": "jatingarg740@gmail.com",
            "productOrderedId": "Thu Apr 30",
            "productName": "iphone 16 pro",
            "country": "India",
            "productDescription": "Iphone 16 PRO",
            // "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959158182.jpg",
            "orderDate": null,
            "orderPrice": "155000",
            "__v": 0
        },
        {
            "_id": "69659500b3",
            "orderById": "69f594fb64",
            "orderBy": "jatingarg740@gmail.com",
            "productOrderedId": "Thu Apr 30",
            "productName": "PUMA ORIGINAL",
            "country": "India",
            "productDescription": "Apple phone",
            // "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959265156.jpg",
            "orderDate": null,
            "orderPrice": "11500",
            "__v": 0
        }
    ],
    "count": 3,
    "message": "Orders fetched  Successfully"
};

//LOGIN TO WEBSITE 

async function LoginToSite(page) {
    await page.goto(BASE_URL);

    await page.locator('//*[@placeholder="email@example.com"]').fill(Email);
    await page.locator('//*[@placeholder="enter your passsword"]').fill(PASSWORD);
    await page.locator('//*[@value="Login"]').click();

    console.log("LOG IN SUCCESSFULLY ")
    
}

async function GOTOORDERS(page) {
    await page.locator('//*[@routerlink="/dashboard/myorders"]').click();
    console.log("Cart Clicked SUCCESSFULLY ")
}

//mock orders 

test.skip('MOCK ORDER API ',async({page})=>{

    await page.route(ORDERS_API,route=>{
        console.log('INTERCEPTED',route.request().url());

        //return our mock data instead of hitting real server
        route.fulfill({
            status : 200,
            contentType : 'application/json',
            body : JSON.stringify(MOCK_ORDERS),
        });
    });

    //STEP 2 LOGIN
    await LoginToSite(page);

    // STEPS 3
    await GOTOORDERS(page);

    //steps 4
    await page.waitForSelector('tbody tr',{timeout : 10000});

    // step -5 assertions 
    await expect(page.getByText('GUCCI COAT 3')).toBeVisible();
    await expect(page.getByText('iphone 16 pro')).toBeVisible();
    await expect(page.getByText('PUMA ORIGINAL')).toBeVisible();

    // step-6

    const row = page.locator('tbody tr');
    await expect(row).toHaveCount(3);
     
    await page.screenshot({path: 'intercept.png',fullPage: true});
})

test.skip('MOCK ORDER API with 0 data ',async({page})=>{

    await page.route(ORDERS_API,route=>{
        console.log('INTERCEPTED(empty)',route.request().url());

        //return our mock data instead of hitting real server
        route.fulfill({
            status : 200,
            contentType : 'application/json',
            body : JSON.stringify({
                data:[],
                cnt:0,
                // message:"order fetched for customers successfully"
            }),
        });
    });

    //STEP 2 LOGIN
    await LoginToSite(page);

    // STEPS 3
    await GOTOORDERS(page);

    //steps 4
    await page.waitForTimeout(2000);
    
    const row = page.locator('tbody tr');
    const cnt = await row.count()
    console.log("number of rows shown: ",cnt);
    await expect(row).toHaveCount(0);
     
    console.log("test 2 ");
    
    await page.screenshot({path: 'intercept.png',fullPage: true});
})

test.skip('MOCK ORDER API with 500 error ',async({page})=>{

    await page.route(ORDERS_API,route=>{
        console.log('INTERCEPTED(empty)',route.request().url());

        //return our mock data instead of hitting real server
        route.fulfill({
            status : 500,
            contentType : 'application/json',
            body : JSON.stringify({
                data:[],
                cnt:0,
                // message:"order fetched for customers successfully"
            }),
        });
    });

    //STEP 2 LOGIN
    await LoginToSite(page);

    // STEPS 3
    await GOTOORDERS(page);

    //steps 4
    await page.waitForTimeout(2000);
    
    const row = page.locator('tbody tr');
    const cnt = await row.count()
    console.log("number of rows shown: ",cnt);
    await expect(row).toHaveCount(0);
     
    console.log("test 2 ");
    
    await page.screenshot({path:"tests/screenshot/"+Date.now()+'HomePage.png',fullPage:true})
})

test('Validate assertion & capture ',async({page})=>{

    let captureResponse = null;
    let capturedURL = null;

    await page.route(ORDERS_API, async route => {
        capturedURL = route.request().url();
        console.log("validate url",capturedURL);

        // Fetching real response from server
        const response = await route.fetch();
        const json = await response.json();
        captureResponse = json;
        await route.fulfill({response});
        
        console.log('INTERCEPTED(empty)',route.request().url());
    });

    //STEP 2 LOGIN
    await LoginToSite(page);

    // STEPS 3
   const responsePromise = page.waitForResponse(ORDERS_API);
   await GOTOORDERS(page);
   const response = await responsePromise;

   expect(response.status()).toBe(200);

   expect(captureResponse).toHaveProperty('data')
   expect(captureResponse).toHaveProperty('count')
   expect(captureResponse).toHaveProperty('message')

   expect(capturedURL).toContain('get-orders-for-customer')

    
    await page.screenshot({path:"tests/screenshot/"+Date.now()+'HomePage.png',fullPage:true})
})

test('Validate assertion  ',async({page})=>{
    const response = await route.fetch();
    const json = await response.json();
    
   log("response from server",json);


    //STEP 2 LOGIN
    await LoginToSite(page);

    // STEPS 3
   const responsePromise = page.waitForResponse(ORDERS_API);
   await GOTOORDERS(page);
//    const response = await responsePromise;

   expect(response.status()).toBe(200);

   expect(captureResponse).toHaveProperty('data')
   expect(captureResponse).toHaveProperty('count')
   expect(captureResponse).toHaveProperty('message')

   expect(capturedURL).toContain('get-orders-for-customer')

    
    await page.screenshot({path:"tests/screenshot/"+Date.now()+'HomePage.png',fullPage:true})
})