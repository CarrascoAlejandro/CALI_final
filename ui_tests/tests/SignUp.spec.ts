import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import {
  generateRandomUsername,
  generateRandomEmail,
  generateRandomPassword,
} from "../util/generateRandom";

test("Sign up with valid data", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSingUpButton();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  await homePage.fillForm(username, email, password);
  await homePage.clickSingUpSubmitButton();
  await homePage.singUpPopup.waitFor({ state: "visible" });
  await expect(homePage.singUpPopup).toContainText(
    `Usuario ${username} registrado correctamente.`
  );
});

test("quick sign up", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.quickSignUp(
    generateRandomUsername(),
    generateRandomEmail(),
    generateRandomPassword()
  );
  await homePage.singUpPopup.waitFor({ state: "visible" });
});
