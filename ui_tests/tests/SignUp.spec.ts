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
  await homePage.clickSignUpButton();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  await homePage.fillForm(username, email, password);
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    `Usuario ${username} registrado correctamente.`
  );
});

test("quick sign up and sign in", async ({ page }) => {
  const homePage = new HomePage(page);
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  await homePage.quickSignUp(username, email, password);
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await homePage.clickSignInButton();
  await homePage.signInUsernameField.fill(username);
  await homePage.signInPasswordField.fill(password);
  await homePage.clickSignInSubmitButton();
});
