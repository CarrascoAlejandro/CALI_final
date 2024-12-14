import { expect, Locator, Page } from "@playwright/test";

export class EditorSortsPage {
    readonly url = "http://localhost:5173/editor_sorts";
    readonly page: Page;

    // Locators
    readonly RandomGeneratorButton: Locator;
    readonly SpinButton: Locator;
    readonly GenerateButton: Locator;
    readonly AnimationDelayInput: Locator;
    readonly SelectionSortButton: Locator;
    readonly NumbersInput: Locator;
    readonly ResultLocator: Locator;
    readonly SwalPopup: Locator;
    readonly SwalConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.RandomGeneratorButton = this.page.locator("#randomArrayButton");
        this.SpinButton = this.page.locator(".d-block input");
        this.GenerateButton = this.page.locator(".d-block .btn");
        this.AnimationDelayInput = this.page.locator("#animationDelay");
        this.SelectionSortButton = this.page.locator(".buttons-container > .btn:nth-child(1)");
        this.NumbersInput = this.page.locator("#inputNumbers");
        this.ResultLocator = this.page.locator(".sorted-result");
        this.SwalPopup = this.page.locator('.swal2-popup');
        this.SwalConfirmButton = this.page.locator('.swal2-confirm');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async generateRandomNumbers(count: string) {
        await this.RandomGeneratorButton.click();
        await this.SpinButton.click();
        await this.SpinButton.fill(count);
        await this.GenerateButton.click();
    }

    async setAnimationDelay(delay: string) {
        await this.AnimationDelayInput.fill(delay);
    }

    async startSelectionSort() {
        await this.SelectionSortButton.click();
    }

    async getInputNumbers(): Promise<string> {
        return await this.NumbersInput.inputValue();
    }

    async validateSortCompletion(count: number, sortedNumbers: number[]) {
        // Esperar hasta que el popup aparezca
        await this.SwalPopup.waitFor({ state: 'visible' });
    
        // Hacer clic en el botón de confirmación
        await this.SwalConfirmButton.click();
        
        const numbers: number[] = [];
        for (let i = 1; i <= count; i++) {
            const numberText = await this.page.locator(`.number-container:nth-child(${i}) > .light-red > span`).textContent();
            numbers.push(Number(numberText));
        }    
        expect(numbers).toEqual(sortedNumbers);
    }
}