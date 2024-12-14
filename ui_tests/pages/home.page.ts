import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly url = "http://localhost:5173/";
  readonly page: Page;
  //Sign Up
  readonly signUpButton: Locator;
  readonly usernameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly signUpSubmitButton: Locator;
  readonly signUpPopup: Locator;
  //Sign In
  readonly signInButton: Locator;
  readonly signInUsernameField: Locator;
  readonly signInPasswordField: Locator;
  readonly signInSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    //Sign Up
    this.signUpButton = this.page.locator("#Register");
    this.usernameField = this.page.locator("#usernameField");
    this.emailField = this.page.locator("#emailField");
    this.passwordField = this.page.locator("#passwordField");
    this.confirmPasswordField = this.page.locator("#confirmPasswordField");
    this.signUpSubmitButton = this.page.locator("#signUpSubmitButton");
    this.signUpPopup = this.page.locator(
      "body > div.swal2-container.swal2-center.swal2-backdrop-show > div"
    );
    //Sign In
    this.signInButton = this.page.locator("#login");
    this.signInUsernameField = this.page.locator("#loginUsernameField");
    this.signInPasswordField = this.page.locator("#loginPasswordField");
    this.signInSubmitButton = this.page.locator("#loginButton");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  //Sing Up
  async clickSignUpButton() {
    await this.signUpButton.waitFor({ state: "visible" });
    await this.signUpButton.click();
  }

  async fillForm(username: string, email: string, password: string) {
    await this.usernameField.fill(username);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
  }

  async fillWrongly(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    await this.usernameField.fill(username);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(confirmPassword);
  }

  async clickSignUpSubmitButton() {
    await this.signUpSubmitButton.click();
  }

  async quickSignUp(username: string, email: string, password: string) {
    await this.clickSignUpButton();
    await this.fillForm(username, email, password);
    await this.clickSignUpSubmitButton();
  }

  //Sign In
  async clickSignInButton() {
    await this.signInButton.waitFor({ state: "visible" });
    await this.signInButton.click();
  }

  async fillSignInForm(username: string, password: string) {
    await this.signInUsernameField.fill(username);
    await this.signInPasswordField.fill(password);
  }

  async clickSignInSubmitButton() {
    await this.signInSubmitButton.click();
  }

  async quickSignIn(username: string, password: string) {
    await this.clickSignInButton();
    await this.fillSignInForm(username, password);
    await this.clickSignInSubmitButton();
  }
}
