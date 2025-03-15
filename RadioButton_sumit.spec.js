const { test, expect, defineConfig } = require('@playwright/test');

// Test case: Radio Button
test('Radio Button - Select Options', async ({ page }) => {
    await page.goto('http://demoqa.com/', { waitUntil: 'domcontentloaded' });
    await page.click("//h5[normalize-space()='Elements']");
    await page.waitForSelector("//div[contains(@class, 'element-list')]", { timeout: 50000 });
    // Navigate to the page where radio buttons are located
    await page.click("(//li[@id='item-2'])[1]");

    const radioButtons = ['Yes', 'Impressive', 'No'];

    for (const option of radioButtons) {
        // Construct the label XPath and the corresponding radio button ID
        const radioLabel = `//label[normalize-space()='${option}']`;
        const radioId = `#${option.toLowerCase()}Radio`;

        // Log the radio label XPath for debugging
        console.log(`Radio Label XPath: ${radioLabel}`);
        
        // Wait for the label to be visible and clickable
        await page.waitForSelector(radioLabel, { visible: true });

        // Check if the radio button is visible before clicking
        const radioLocator = page.locator(radioId);
        const isRadioVisible = await radioLocator.isVisible();
        const isRadioDisabled = await radioLocator.isDisabled();

        if (isRadioDisabled) {
            console.log(`Radio Button '${option}' is disabled and was skipped.`);
        } else if (isRadioVisible) {
            // Click the label to select the radio button
            await page.locator(radioLabel).click();

            // Assert the radio button is checked
            expect(await radioLocator.isChecked()).toBeTruthy();
            console.log(`Radio Button '${option}' selected.`);
        } else {
            console.log(`Radio Button '${option}' is not visible and was skipped.`);
        }
    }
});
