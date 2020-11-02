// ABOUT BINARY HEAPS:

// Heaps are technically a type of tree
// MAX: parent nodes are always larger than child nodes
// MIN: parent nodes are always smaller than child nodes
// no left to right order like in BSTs
// every left and right will be filled before adding new lower row
// children are filled left first, then right, as order doesn't matter this is just an arbitrary practice
// often used to implement Priority Queues
// used with graph traversal algos usually

// with parent at index n, left child is 2n + 1, right child is 2n + 2
// with child at index n, the parent is at Math.floor((n-1)/2)

class BinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(val) {
    // push to end
    this.values.push(val);
    // bubble up
    let child = this.values.length - 1;
    let parent = Math.floor((child - 1) / 2);
    while (this.values[child] > this.values[parent]) {
      [this.values[child], this.values[parent]] = [
        this.values[parent],
        this.values[child],
      ];
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
    // while greater than its parent, swap
    // when no longer greater, let it stay, break while.

    return this.values;
  }
  extractMax() {
    // ie remove root
    let oldRoot = this.values[0];
    console.log('original this.values: ', this.values);
    // swap last with first
    if (this.values.length > 1) {
      this.values[0] = this.values.pop();
      console.log('took off root, put last val at root:', this.values);
      this.sinkDown();
    } else {
      this.values.pop();
    }
    console.log('ran the sink down: ', this.values);
    return oldRoot;
  }
  sinkDown() {
    let idx = 0;
    let element = this.values[0];
    while (true) {
      let swapIdx = null;

      let leftChildIdx = idx * 2 + 1;
      let rightChildIdx = idx * 2 + 2;
      let leftChild, rightChild;
      // think aboutl left side
      if (leftChildIdx < this.values.length) {
        // make sure leftChildIdx isn't past the end of values / is valid
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          // if leftChild is bigger than element it's ok to set swapIdx to this now, may change later
          swapIdx = leftChildIdx;
        }
      }
      // think about right side
      if (rightChildIdx < this.values.length) {
        // make sure rightChildIdx isn't past the end of values / is valid
        rightChild = this.values[rightChildIdx];
        if (
          (swapIdx === null && rightChild > element) || // if left was smaller, right could still be bigger than element
          (swapIdx !== null && rightChild > leftChild) // left may've been bigger than element, but right can be bigger than left
        ) {
          // if so swap now changes to right.
          // otherwise its on the left one or is still null
          swapIdx = rightChildIdx;
        }
      }
      // if no swaps happened, the element has found its final resting place, break and end sink down function
      if (swapIdx === null) break;
      // else not null, so a swap happened:
      // for the next iteration of while loop, we need to actually make the swap, and set the idx we work with to be the swapIdx
      this.values[idx] = this.values[swapIdx];
      this.values[swapIdx] = element;
      idx = swapIdx;
    }
    return;
  }
}

let bh = new BinaryHeap();
bh.values = [50, 31, 27, 18, 29, 7, 10, 2, 3, 11, 12];
console.log(bh);

let parentOfIdx8 = bh.values[Math.floor((8 - 1) / 2)]; // idx3
console.log(parentOfIdx8); // idx 3, is 18
bh.insert(1);
bh.insert(4);
bh.insert(6);
bh.insert(5);
// // INSERT WHEN VAL IS SMALLER WORKS;

let b2 = new BinaryHeap();
b2.values = [50, 31, 10, 18, 29, 7, 6, 2, 3, 11, 12, 1, 4, 5];
console.log('INSERT: ', b2.insert(27)); // 27 should end up where 10 is. 10 will go after 7 where 6 is. 6 goes to end.
// INSERT WHEN VAL IS LARGER WORKS;

let b3 = new BinaryHeap();
b3.values = [50, 31, 27, 18, 29, 7];
console.log('oldRoot: ', b3.extractMax());
console.log('oldRoot: ', b3.extractMax());
console.log('oldRoot: ', b3.extractMax());
console.log('oldRoot: ', b3.extractMax());
console.log('oldRoot: ', b3.extractMax());
console.log('oldRoot: ', b3.extractMax());
console.log('oldRoot: ', b3.extractMax());
console.log(b3.values);
// EXTRACTMAX ie REMOVE ROOT WORKS
