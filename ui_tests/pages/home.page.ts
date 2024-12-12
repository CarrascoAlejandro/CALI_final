import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly url = "http://localhost:5173/";
  readonly page: Page;
  //Sing Up
  readonly singUpButton: Locator;
  readonly usernameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly singUpSubmitButton: Locator;
  readonly singUpPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.singUpButton = this.page.locator("#Register");
    this.usernameField = this.page.locator("#usernameField");
    this.emailField = this.page.locator("#emailField");
    this.passwordField = this.page.locator("#passwordField");
    this.confirmPasswordField = this.page.locator("#confirmPasswordField");
    this.singUpSubmitButton = this.page.locator("#singUpSubmitButton");
    this.singUpPopup = this.page.locator(
      "body > div.swal2-container.swal2-center.swal2-backdrop-show > div"
    );
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickSingUpButton() {
    await this.singUpButton.waitFor({ state: "visible" });
    await this.singUpButton.click();
  }

  async fillForm(username: string, email: string, password: string) {
    await this.usernameField.type(username);
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.confirmPasswordField.type(password);
  }

  async clickSingUpSubmitButton() {
    await this.singUpSubmitButton.click();
  }

  async quickSignUp(username: string, email: string, password: string) {
    await this.goto();
    await this.clickSingUpButton();
    await this.fillForm(username, email, password);
    await this.clickSingUpSubmitButton();
  }
}
