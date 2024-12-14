import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import {
  generateRandomUsername,
  generateRandomEmail,
  generateRandomPassword,
} from "../util/generateRandom";

test("Sign in with valid data", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  await homePage.quickSignUp(username, email, password);
  await homePage.signUpPopup.waitFor({ state: "hidden" });
  await homePage.clickSignInButton();
  await homePage.fillSignInForm(username, password);
  await homePage.clickSignInSubmitButton();
});

test("Sign ip with all empty fields", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignInButton();
  await homePage.clickSignInSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor ingrese sus credenciales completas."
  );
});

test("Sign ip with empty username", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignInButton();
  const password = generateRandomPassword();
  await homePage.fillSignInForm("", password);
  await homePage.clickSignInSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor ingrese sus credenciales completas."
  );
});

test("Sign ip with empty password", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignInButton();
  const username = generateRandomUsername();
  await homePage.fillSignInForm(username, "");
  await homePage.clickSignInSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor ingrese sus credenciales completas."
  );
});

test("Sign ip with wrong username", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignInButton();
  const password = generateRandomPassword();
  await homePage.fillSignInForm("wrongusername", password);
  await homePage.clickSignInSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Usuario o contraseña incorrectos."
  );
});

test("Sign ip with wrong password", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignInButton();
  const username = generateRandomUsername();
  await homePage.fillSignInForm(username, "wrongpassword");
  await homePage.clickSignInSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Usuario o contraseña incorrectos."
  );
});
