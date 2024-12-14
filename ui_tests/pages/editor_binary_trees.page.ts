import { expect, Locator, Page } from "@playwright/test";

export class EditorBinaryTreesPage {
    readonly url = "http://localhost:5173/editor_binary_trees"
    readonly page: Page;
    //Editor
    readonly InputTextBinaryTreeLeaf: Locator;
    readonly ButtonAddNode: Locator;
    readonly ButtonShowPaths: Locator;
    readonly ButtonInsertData: Locator;
    readonly InputTextPostOrder: Locator;
    readonly InputTextInOrder: Locator;
    readonly OkButton: Locator;
    readonly Swal2Title: Locator;

    constructor(page: Page) {
        this.page = page;
        //Editor
        this.InputTextBinaryTreeLeaf = this.page.locator("#binaryTreeLeaf");
        this.ButtonAddNode = this.page.locator("#button-addNode");
        this.ButtonShowPaths = this.page.locator("#showBFS");
        this.ButtonInsertData = this.page.locator("#addData");
        this.InputTextPostOrder = this.page.locator("#postOrderInput");
        this.InputTextInOrder = this.page.locator("#inOrderInput");
        this.OkButton = this.page.locator("#button-addNode-ok");
        this.Swal2Title = this.page.locator("#swal2-title");
    }

    async goto() {
        await this.page.goto(this.url);
    }

    //Editor
    async insertNodeData(data: string[]) {
        for (let i = 0; i < data.length; i++) {
            await this.InputTextBinaryTreeLeaf.fill(data[i]);
            await this.ButtonAddNode.click();
        }
    }

    async insertMassData(postOrder: string, inOrder: string) {
        await this.ButtonInsertData.click();
        //timeout for the modal to appear 
        await this.OkButton.waitFor({ state: "visible" });
        await this.InputTextPostOrder.fill(postOrder);
        await this.InputTextInOrder.fill(inOrder);
        await this.OkButton.click();
    }

    async assertPaths(expectedPreorder: string, expectedInorder: string, expectedPostorder: string) {
        await this.ButtonShowPaths.click();
        await this.Swal2Title.waitFor({ state: "visible" });
        const text = await this.Swal2Title.textContent();
        expect(text).toContain(expectedPreorder);
        expect(text).toContain(expectedInorder);
        expect(text).toContain(expectedPostorder);
    }
}