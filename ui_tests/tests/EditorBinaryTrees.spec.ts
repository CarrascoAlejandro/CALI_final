import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { EditorBinaryTreesPage } from "../pages/editor_binary_trees.page";
import { generateRandomBinaryTree, preOrderTraversal, inOrderTraversal, postOrderTraversal } from "../util/binaryTrees";

//before each
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.quickSignIn("bob", "123456");
});

test("Insert a binary tree and check its BFS paths", async ({ page }) => {
    const editorBinaryTreesPage = new EditorBinaryTreesPage(page);
    await editorBinaryTreesPage.goto();
    
    // Prep data
    const binaryTree = generateRandomBinaryTree(4);
    console.log("Generated Tree:", JSON.stringify(binaryTree, null, 2));
    const preOrder = preOrderTraversal(binaryTree).join(", ");
    const inOrder = inOrderTraversal(binaryTree).join(", ");
    const postOrder = postOrderTraversal(binaryTree).join(", ");

    // Insert data
    await editorBinaryTreesPage.insertMassData(postOrder, inOrder);

    // Check paths
    await editorBinaryTreesPage.assertPaths(preOrder, inOrder, postOrder);
});