import {test,expect} from '@playwright/test';

test ('Daraz Price', async ({page})=>{
    
    await page.goto('https://www.daraz.com.bd/catalog/?spm=a2a0e.tm80335411.search.d_go&q=bag');

    await page.waitForSelector("span:has-text('৳')");  // Wait for the price elements to be available (to ensure the page is fully loaded)
    const priceLocators = await page.locator("xpath=//span[contains(text(),'৳')]"); // Select all price elements containing the Taka symbol (৳)

  // Get the text content of all elements and process each one
    const priceElements = await priceLocators.allInnerTexts();  // Get text content of all matched elements

  // Loop through each element, clean up and convert the price
    const prices = priceElements.map(priceText => {
    const cleanedValue = priceText.replace('৳', '').trim();  // Remove the dollar sign and trim spaces
    return parseFloat(cleanedValue);  // Convert the value to a number
  });

    //console.log(prices);
    prices.filter(price => !isNaN(price)).forEach(price => {
        console.log(`price: ${price}`);
    });

    // Filter out NaN values
const validPrices = prices.filter(price => !isNaN(price));

// Function to check if the prices are in ascending, descending, or mixed order
function checkOrder(prices) {
  let isAscending = true;
  let isDescending = true;

  // Compare each price with the next one
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] < prices[i + 1]) {
      isDescending = false; // If any price is less than the next, it's not descending
    } else if (prices[i] > prices[i + 1]) {
      isAscending = false; // If any price is greater than the next, it's not ascending
    }
  }

  // Determine the order
  if (isAscending) {
    return 'Ascending Order';
  } else if (isDescending) {
    return 'Descending Order';
  } else {
    return 'Mixed Order';
  }
}

// Get the order of prices
const order = checkOrder(validPrices);

console.log(`Prices are in: ${order}`);

    //await new Promise(resolve => {});
    //await page.waitForTimeout(5000);
});