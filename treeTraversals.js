// ABOUT TREE TRAVERSALS

/**
 * Non Binary Search Trees are still Trees. They are just trees with Nodes that aren't especially ordered.
 *        
 *        10
 *       /  \
 *      22   15
 *     /  \    \
 *    3   14    6
 * 
 
 * Breadth First Search (BFS): 
 *   start at root, level down, go across tree from left to right, level down, repeat etc...
 *   you'd get: 10, 22, 15, 3, 14, 6
 * 
 * Depth First Search (DFS):
 * 
 *   PreOrder:
 *     root, then whole left side goin down, then whole right side going down
 *     you'd get: 10, 22, 3, 14, 15, 6
 * 
 *   PostOrder:
 *     bottom up from the left, the bottom up from the right, then root...
 *     you'd get: 3, 14, 22, 6, 15, 10
 *     
 * 
 *   InOrder:
 *     imagine going "in order" if the tree were a BST (they'd turn out in order)
 *       basically bottom left, parent, down (set of 3), then parent (then down)... etc
 *     you'd get: 3, 22, 14, 10, 15, 6
 */

class Tree {
  constructor() {
    this.root = null;
    this.length = 0;
  }
  insert(val) {
    // in this example I'm just using the insert for BST style, not random insertion
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (val == current.val) return null; // handles duplicates
        if (val < current.val) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else {
          // val > current.val
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  bfs() {
    // USE A QUEUE!
    let visited = [];
    let current = this.root;
    let q = [];
    q.push(current);

    while (q.length) {
      current = q.shift();
      console.log('current: ', current);
      visited.push(current.val); // or push current, to get them as whole nodes listed in the array
      if (current.left) q.push(current.left);
      if (current.right) q.push(current.right);
    }

    return visited;
  }
  dfsPreOrder() {
    let visited = [];
    let current = this.root; // don't need this, but could allow a user to specify a starting point
    function traverse(node) {
      visited.push(node.val);
      if (node.left || node.right)
        return traverse(node.left) || traverse(node.right);
      // this could also be written as below:
      // if (node.left) traverse(node.left);
      // if (node.right) traverse(node.right);
    }
    traverse(current);

    return visited;
  }
  dfsPostOrder() {
    let visited = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
        visited.push(node.left.val);
      }
      if (node.right) {
        traverse(node.right);
        visited.push(node.right.val);
      }
    }
    // can also write it like below:
    // function traverse(node) {
    //   if (node.left || node.right) traverse(node.left) || traverse(node.right);
    //   visited.push(node.val);
    // }
    traverse(current);
    visited.push(current.val);

    return visited;
  }
  dfsInOrder() {
    let visited = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
      // can also write these ifs like:
      // node.left && traverse(node.left);
      // visited.push(node.val);
      // node.right && traverse(node.right);
    }
    traverse(current);
    return visited;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let tree = new Tree();
console.log(tree);
tree.insert('4');
tree.insert('2');
tree.insert('6');
tree.insert('1');
tree.insert('3');
tree.insert('5');
tree.insert('7');
console.log('full tree: ', tree);

/**
 *  TEST:
 *          4
 *         / \
 *        2   6
 *       / \ / \
 *      1  3 5  7
 *
 */

console.log("tree's bfs order: ", tree.bfs()); // expect [4,2,6,1,3,5,7]
console.log("tree's dfs pre order: ", tree.dfsPreOrder()); // expect [4,2,1,3,6,5,7];
console.log("tree's dfs post order: ", tree.dfsPostOrder()); // expect [1,3,2,5,7,6,4];
console.log("tree's dfs in order: ", tree.dfsInOrder()); // expect [1,2,3,4,5,6,7];

/**
 * TIME COMPLEXITY OF BFS & DFSs:
 *
 *   - in each method, we must check each node once, so it is O(N) time where N is the total number of nodes
 *
 * SPACE COMPLEXITY IS DIFFERENT:
 *
 *              tree A                       tree B
 *                 x                            x
 *                / \                            \
 *               /   \                            \
 *              /     \                            \
 *             /       \                            \
 *            /         \                            \
 *           /           \                            \
 *          /             \                            \
 *         x               x                            x
 *        / \             / \                            \
 *       /   \           /   \                            \
 *      /     \         /     \                            \
 *     x       x       x       x                            x
 *    / \     / \     / \     / \                            \
 *   x   x   x   x   x   x   x   x                            x
 *  / \ / \ / \ / \ / \ / \ / \ / \                            \
 *  x x x x x x x x x x x x x x x x                             x
 *
 * Consider the above tree A:
 *   for BFS, using the queue means that the larger (wider) N grows, the more stuff stays in Queue at each level,
 *   tree A would do better SPACEwise with DFS, because there will only be the # of levels down on the call stack at once,
 *     as opposed to having the number of nodes across at each level on the call stack at once
 *
 * Consider the above tree B:
 *   BFS is good for narrower/deeper trees with many depths to go down
 *   In the case of this completely degenerate tree (may as well be a linked list) the max nodes on the q is only ever 1,
 *     so BFS will take up less space than DFS (which would store all nodes to the bottom before letting them off the stack)
 *
 * In general:
 *   It seems that the majority of trees we will experience are more like tree A than tree B,
 *     but of course, wildly unbalanced trees can still exist and need to be worked with
 *
 *  BENEFITS OF EACH METHOD:
 *
 *  IN ORDER:
 *    great to use dfsInOrder with BSTs because it will actually return the numbers "in order" (lowest to highest)
 *
 *  PRE ORDER:
 *    can be great method to make a tree "easily copy-able" - you can basically flatten it and just add in a direction for how
 *    to reconstruct (id, this is bottom left, now work up... etc)
 *      also great because you know from the start which node is the root (in the above example, 4)
 *
 *  POST ORDER:
 *    could be nice for preserving a parent/child order
 *    (ie, when for some reason you want to check all the children before checking the parent)
 *
 *        over all, the main differences (time & space) are between BFS & (general) DFS, so be careful picking between these 2.
 *          for the difference between the 3 DFSs, it matters less drastically (time & space) which of the 3 you pick
 *
 *  RECAP of TREES:
 *    - a non-linear data structure that contain a root, and child nodes
 *    - binary trees are a special case (where each parent may only have 2 children max (values any type), a left and a right)
 *       - (there are also other numbers of children a tree could have, like ternary or quaternary trees)
 *       - (there could also be trees with variable numbers of children on each parent)
 *
 *       - (full binary trees: where each parent has 0 or 2 children (not just 1))
 *       - (complete binary trees: where all levels are filled (with 2 children) except for possibly the lowest/last level)
 *       - (perfect binary trees: where all parent nodes have 2 children, and all leaves end at same level of depth)
 *
 *       - BSTs are an ordered/sorted tree (you can only make a BST with data types that are comparable)
 *          - each left child is less than parent, each right child is greater than parent.
 *          - if you want to created as balanced a BST as possible from a list of ordered numbers,
 *            pick for the root a value near the middle
 *
 *    - We can search trees (of any shape) using BFS (breadth first search) and DFS (depth first search)
 *
 */
