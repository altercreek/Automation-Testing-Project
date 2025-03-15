const { test, expect } = require('@playwright/test');

test('Test Elements Section on DemoQA', async ({ page }) => {
    // Navigate to DemoQA
    await page.goto('https://demoqa.com/');

    // Click on the 'Elements' card
    await page.click("//h5[text()='Elements']");

    // Wait for the Elements page to load
    await page.waitForSelector("//div[contains(@class, 'element-list')]");

    // Verify the URL contains '/elements'
    await expect(page).toHaveURL(/.*elements/);

    // Click on the 'Text Box' menu item
    await page.click("//span[text()='Text Box']");

    // Fill in the text box form
    await page.fill("#userName", "Akp");
    await page.fill("#userEmail", "akp@example.com");
    await page.fill("#currentAddress", "123 Main Street");
    await page.fill("#permanentAddress", "456 Another Street");

    // Click Submit
    await page.click("#submit");

    // Verify submitted data appears in output
    await expect(page.locator("#output")).toContainText("John Doe");
    await expect(page.locator("#output")).toContainText("johndoe@example.com");
    await expect(page.locator("#output")).toContainText("123 Main Street");
    await expect(page.locator("#output")).toContainText("456 Another Street");
    await page.waitForTimeout(30000);
}, { timeout: 60000 });
