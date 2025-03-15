const { test, expect } = require('@playwright/test');

test("Product Price", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click on Login button - property (ID, Name)

    //await page.click("id=login2"); // id locstor
    await page.click("#login2"); // css locator

    //Provide User Name - CSS
    await page.fill("#loginusername", "mahady"); // css locator

    //Provide password - CSS
    await page.fill("//input[@id='loginpassword']", "12345678"); // Rel Xpath

    //Click on Login button - Xpath
    await page.click("//button[normalize-space()='Log in']");

    await page.click("//div[@id='contcont']//a[2]"); // Phone xapth for sorting

    await page.waitForTimeout(5000)

    // Product Price, Name and Total Product counting
    // Select all product elements
    const products = await page.locator("//div[@id='tbodyid']//div[contains(@class, 'col-lg-4 col-md-6 mb-4')]");

    // Ensure elements are loaded
    await page.waitForTimeout(5000);

    const productCount = await products.count();
    console.log(`Total Products: ${productCount}`); // console output

    // Extract and print individual prices
     for (let i = 0; i < productCount; i++) {
         const product = products.nth(i); // Get element by index
         const priceText = await product.locator('h5').innerText(); // Select <h5> directly
         console.log(`Price: ${priceText}`);
     }

    await page.waitForTimeout(5000);



});