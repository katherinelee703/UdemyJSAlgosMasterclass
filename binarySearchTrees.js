// ABOUT BSTs

// ITERATIVE APPROACH:
class BST {
  constructor() {
    this.root = null;
  }
  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (val == current.val) return null; // HANDLING DUPLICATES HERE
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
  find(val) {
    if (!this.root) return null;
    let current = this.root;
    while (true) {
      if (current.val === val) return true; // or return current;
      if (val < current.val) {
        if (current.left) {
          current = current.left;
        } else {
          return false;
        }
      } else {
        if (current.right) {
          current = current.right;
        } else {
          return false;
        }
      }
    }
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let bst = new BST();
// bst.root = new Node(10);
// bst.root.left = new Node(5);
// bst.root.right = new Node(15);
// console.log("bst: ", bst);

console.log('insert 12: ', bst.insert(12));
console.log('insert 5: ', bst.insert(5));
console.log('insert 17: ', bst.insert(17));
console.log('insert 9: ', bst.insert(9));
console.log('insert 13: ', bst.insert(13));
console.log('insert 22: ', bst.insert(22));
console.log('insert 1: ', bst.insert(1));
console.log('insert 9 again: ', bst.insert(9)); // null
// bst.root.left.right.val; // 9
// bst.root.right.right.val; // 22
// bst.root.left.left.val; // 1

console.log('find 12: ', bst.find(12)); // true
console.log('find 17: ', bst.find(17)); // true
console.log('find 5: ', bst.find(5)); // true
console.log('find 1: ', bst.find(1)); // true
console.log('find 9: ', bst.find(9)); // true
console.log('find 13: ', bst.find(13)); // true
console.log('find 22: ', bst.find(22)); // true
console.log('find 999: ', bst.find(999)); // false
let empty = new BST();
console.log('find 111 on empty: ', empty.find(111)); // null

/*
* bst should look like this:
*
*        12
*      /   \
*     5     17
*   /  \   /  \
*  1    9 13  22

TIME COMPLEXITY OF BSTs:

Insertion: O(log n)
Searching: O(log n)
  BUT these are NOT guaranteed:
  - (you could have a degenerate tree - where all are on one side, basically it became a SLL)
  - (you could have a terribly unbalanced tree - where almost all are on one side)

*/
