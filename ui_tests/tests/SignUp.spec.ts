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

test("Sign up with all empty fields", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignUpButton();
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor, completa todos los campos."
  );
});

test("Sign up with empty username", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignUpButton();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  await homePage.fillForm("", email, password);
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor, completa todos los campos."
  );
});

test("Sign up with empty email", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignUpButton();
  const username = generateRandomUsername();
  const password = generateRandomPassword();
  await homePage.fillForm(username, "", password);
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor, completa todos los campos."
  );
});

test("Sign up with empty password", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignUpButton();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  await homePage.fillForm(username, email, "");
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Por favor, completa todos los campos."
  );
});

test("Sign up with different passwords", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignUpButton();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  const confirmPassword = "NotTheSamePassword";
  await homePage.fillWrongly(username, email, password, confirmPassword);
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "Las contraseñas no coinciden."
  );
});

test("Sign up with short password", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickSignUpButton();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = "123";
  await homePage.fillForm(username, email, password);
  await homePage.clickSignUpSubmitButton();
  await homePage.signUpPopup.waitFor({ state: "visible" });
  await expect(homePage.signUpPopup).toContainText(
    "La contraseña debe tener al menos 6 caracteres."
  );
});

test("quick sign up and sign in", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  const username = generateRandomUsername();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  await homePage.quickSignUp(username, email, password);
  await homePage.signUpPopup.waitFor({ state: "hidden" });
  await homePage.quickSignIn(username, password);
});
