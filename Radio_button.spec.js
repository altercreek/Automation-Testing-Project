const { test, expect } = require('@playwright/test');

test('Test Radio Button on DemoQA', async ({ page }) => {
    // Step 1: Open DemoQA
    await page.goto('https://demoqa.com/', { timeout: 60000 });

    // Step 2: Click on 'Elements' card
    await page.click("//h5[text()='Elements']");

    // Step 3: Click on 'Radio Button' in the left menu
    await page.click("//span[text()='Radio Button']");

    // Step 4: Wait for radio buttons to load
    await page.waitForSelector("div[class*='custom-control']");

    // Step 5: Select the 'Yes' radio button
    const yesRadioButton = page.locator("//label[@for='yesRadio']");
    await yesRadioButton.click();

    // Step 6: Verify 'Yes' radio button is selected
    await expect(yesRadioButton.locator('input')).toBeChecked();

    // Step 7: Verify the result displays 'You have selected Yes'
    await expect(page.locator("#result")).toHaveText("You have selected Yes");

    // Step 8: Select the 'Impressive' radio button
    const impressiveRadioButton = page.locator("//label[@for='impressiveRadio']");
    await impressiveRadioButton.click();

    // Step 9: Verify 'Impressive' radio button is selected
    await expect(impressiveRadioButton.locator('input')).toBeChecked();

    // Step 10: Verify the result displays 'You have selected Impressive'
    await expect(page.locator("#result")).toHaveText("You have selected Impressive");

    // Step 11: Wait for a few seconds to observe
    await page.waitForTimeout(3000);
});
