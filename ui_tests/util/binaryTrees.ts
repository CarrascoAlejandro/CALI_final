// Define the structure of a binary tree node
interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

/**
 * Generates a binary tree randomly.
 * @param depth - The maximum depth of the binary tree.
 * @param minValue - The minimum value for a tree node.
 * @param maxValue - The maximum value for a tree node.
 * @returns The root of the generated binary tree.
 */
function generateRandomBinaryTree(depth: number, minValue: number = 0, maxValue: number = 1000): TreeNode | null {
    // Base case: If depth is 0, return null (no node).
    if (depth === 0) return null;

    // Generate a random value for the current node.
    const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    // Randomly decide whether to create left and right children.
    const hasLeftChild = Math.random() > 0.5;
    const hasRightChild = Math.random() > 0.5;

    return {
        value,
        left: hasLeftChild ? generateRandomBinaryTree(depth - 1, minValue, maxValue) : null,
        right: hasRightChild ? generateRandomBinaryTree(depth - 1, minValue, maxValue) : null,
    };
}

/**
 * Performs pre-order traversal on a binary tree.
 * @param root - The root of the binary tree.
 * @returns An array of values in pre-order traversal.
 */
function preOrderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    return [root.value, ...preOrderTraversal(root.left), ...preOrderTraversal(root.right)];
}

/**
 * Performs in-order traversal on a binary tree.
 * @param root - The root of the binary tree.
 * @returns An array of values in in-order traversal.
 */
function inOrderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...inOrderTraversal(root.left), root.value, ...inOrderTraversal(root.right)];
}

/**
 * Performs post-order traversal on a binary tree.
 * @param root - The root of the binary tree.
 * @returns An array of values in post-order traversal.
 */
function postOrderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...postOrderTraversal(root.left), ...postOrderTraversal(root.right), root.value];
}

export { generateRandomBinaryTree, preOrderTraversal, inOrderTraversal, postOrderTraversal };

/* // Example usage
const tree = generateRandomBinaryTree(4);
console.log("Generated Tree:", JSON.stringify(tree, null, 2));
console.log("Pre-order Traversal:", preOrderTraversal(tree));
console.log("In-order Traversal:", inOrderTraversal(tree));
console.log("Post-order Traversal:", postOrderTraversal(tree)); */
