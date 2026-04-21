const {test,expect} = require('@playwright/test')

test.skip('upload single',async({page})=>{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    const upload = await page.locator('#filesToUpload');
    await upload.setInputFiles("tests/files/resume1.pdf");
    await page.waitForTimeout(5000);

    await expect(page.locator("#fileList")).toHaveText("resume1.pdf");
})

test.skip("upload multiple",async({page})=>{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    await page.locator("#filesToUpload").setInputFiles("test/files/resume1.pdf","test/files/Testing.pdf");
    await page.waitForTimeout("5000");

    await expect(page.locator("//*[id='fileList']//li[1]")).toHaveText("resume1.pdf");
    await expect(page.locator("//*[id='fileList']//li[2]")).toHaveText("Testing.pdf");
})

test('File downlod ', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');
    console.log("Page Opened Successfully ")
    
    const downloadPromise = page.waitForEvent('download');
    await page.locator("//*[@class='example']/a").first().click();

    const download = await downloadPromise;
    const filename = download.suggestedFilename();

    await download.saveAs('./' + filename);

    console.log("File Downloaded Successfully ");
    console.log("FileName :- ", filename);

    console.log("Saved in : Playwright Folder");
});

