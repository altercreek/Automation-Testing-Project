import {test,expect} from '@playwright/test';

test ('Login Locators', async ({page})=>{
    await page.goto('https://www.demoblaze.com/');

    //Click on Login button - Xpath
    await page.click("//div[@id='contcont']//a[2]");

    // select product
    const priceLocators = await page.locator("xpath=//h5[contains(text(), '$')]");

  // Get the text content of all elements and process each one
    const priceElements = await priceLocators.allTextContents();  // Get text content of all matched elements

  // Loop through each element, clean up and convert the price
    const prices = priceElements.map(priceText => {
    const cleanedValue = priceText.replace('$', '').trim();  // Remove the dollar sign and trim spaces
    return parseFloat(cleanedValue);  // Convert the value to a number
  });

    console.log(parseFloat);
    await page.waitForTimeout(5000); 


    //Browser close
    //await page.close();

})