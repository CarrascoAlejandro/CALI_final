import { test} from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { EditorSortsPage } from "../pages/editor_sorts.page";

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.quickSignIn("pepe", "123456");
});

test("Generate random numbers, perform Selection Sort, and validate sorted output", async ({ page }) => {
    const editorSortsPage = new EditorSortsPage(page);
    await editorSortsPage.goto();

    // Generate random numbers
    const numberCount = 40; // Number of random numbers to generate
    await editorSortsPage.generateRandomNumbers(String(numberCount));

    // Capture the input numbers to compare later
    const inputNumbers = await editorSortsPage.getInputNumbers();
    const originalNumbers = inputNumbers.split(", ").map(Number);

    // Set animation delay
    await editorSortsPage.setAnimationDelay("0");

    // Perform Selection Sort
    await editorSortsPage.startSelectionSort();
    const sortedNumbers = [...originalNumbers].sort((a, b) => a - b);
    await editorSortsPage.validateSortCompletion(numberCount, sortedNumbers);
});

