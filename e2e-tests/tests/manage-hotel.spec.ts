import { test, expect } from "@playwright/test";
import path from 'path'

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

  //getting sign in button. Name prop has the text to be found on page
  await page.getByRole("link", {name : "Sign in"}).click();
  //checking if link redirected to sign in page
  await expect(page.getByRole("heading", {name : "Login"})).toBeVisible();
  //check if we can fill email and password fields
  await page.locator("[name=email]").fill("1@1.com")
  await page.locator("[name=password]").fill("password123")
  //click on login
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Successfully logged in")).toBeVisible();
})

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator("[name='name']").fill("Test Hotel");
    await page.locator("[name='city']").fill("Test City");
    await page.locator("[name='country']").fill("Test Country");
    await page.locator("[name='description']").fill("Test description");
    await page.locator("[name='pricePerNight']").fill("1500");
    await page.selectOption("select[name='starRating']", "3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free WiFi").check();
    await page.locator("[name='adultCount']").fill("2")
    await page.locator("[name='childCount']").fill("2")

    await page.setInputFiles('[name="imageUrls"]', [
      path.join(__dirname, "files", "1.jpg"),
      path.join(__dirname, "files", "2.jpg")
    ])

    await page.getByRole("button", {name : "Save"}).click();
    await expect(page.getByText("Hotel successfully added")).toBeVisible();
    
})