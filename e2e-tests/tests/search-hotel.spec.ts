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
  await page.locator("[name=password]").fill("password")
  //click on login
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Successfully logged in")).toBeVisible();
})

test("Should allow hotel search results", async({page}) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("Pune");
    await page.getByRole("button", {name : "Search"}).click();

    await expect(page.getByText("Hotels found in Pune")).toBeVisible();
    await expect(page.getByText("Manali Resort updated")).toBeVisible();
})

test("should show hotel details", async({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Pune");
  await page.getByRole("button", {name : "Search"}).click();

  await page.getByText("Manali Resort updated").click();

  await expect(page).toHaveURL(/details/);
  await expect(page.getByRole("button", {name : "Book Now"})).toBeVisible();


  
})