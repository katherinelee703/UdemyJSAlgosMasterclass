// ABOUT BINARY HEAPS

/**
 * A binary heap is a type of tree where each parent can have at most a left and right child.
 * In a max heap the parent must be greater than both of the children, but the left & right child do not have to be ordered like a BST
 * In a min heap the parent must be smaller than both of the children, but the left & right child do not have to be ordered like a BST
 *
 * A binay heap can be stored in an array thanks to a handy math method that will find locations of parents and chilren by index:
 *
 *   given a parent, find the 2 children:
 *      left child = this.values[2 * idx + 1];
 *     right child = this.values[2 * idx + 2];
 *
 *   given a child, find the 1 parent:
 *      parent = this.values[Math.floor((idx - 1) / 2)];
 *
 *   EXAMPLE of MAX BINARY HEAP:
 *
 *             41
 *            /  \
 *          39    33
 *         /  \  /
 *        18  27 12
 *                                               p------>lc
 *  this can be stored in this.values as [41,39,33,18,27,12]
 *                                            p<---c
 *  given 33 as a parent, it's children are:
 *    left = 12    --> bc 33's idx is 2, we want this.values[2*2+1], which is this.values[5] which is 12
 *    right = none --> bc 33's idx is 2, we want this.values[2*2+2], which is this.values[6] which is out of bounds
 *    so, 33 only has 1 child.
 *
 *  given 18 as a child, it's parent is:
 *    parent = 39 --> bc 18's idx is 3, we want this.values[Math.floor(3-1)/2], which is this.values[Math.floor(1)],
 *                    which is this.values[1], which is 39
 */

class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12]; // easy way for simpler test
  }
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this.values; // or this;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let el = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let par = this.values[parentIdx];
      if (el <= par) break;
      this.values[parentIdx] = el;
      this.values[idx] = par;
      idx = parentIdx;
    }
    return;
  }
  extractMax() {
    let newMax = this.values.pop();
    let oldMax = this.values[0];
    if (this.values.length === 0) return newMax;

    this.values[0] = newMax;
    this.sinkDown();
    return oldMax;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

let maxheap = new MaxBinaryHeap();

console.log('original maxheap: ', maxheap.values);
// [41,39,33,18,27,12]
/**
 *             41
 *            /  \
 *          39    33
 *         /  \  /
 *        18  27 12
 */

console.log('insert 55: ', maxheap.insert(55));
// [55,39,41,18,27,12,33]

/**
 *             41
 *            /  \
 *          39    33
 *         /  \  /  \
 *        18  27 12 55
 */
/**
 *             41
 *            /  \
 *          39    55
 *         /  \  /  \
 *        18  27 12 33
 */
/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 */

console.log('insert 1: ', maxheap.insert(1));
// [55,39,41,18,27,12,33,1]

/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 *       /
 *      1
 */
console.log('insert 45: ', maxheap.insert(45));
// [55,45,41,39,27,12,33,1,18]

/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 *       /  \
 *      1   45
 */
/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        45  27 12 33
 *       /  \
 *      1   18
 */
/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39  27 12 33
 *       /  \
 *      1   18
 */
console.log('insert 100: ', maxheap.insert(100));
// [100,55,41,39,45,12,33,1,18,27]

/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39  27 12 33
 *       / \  /
 *      1  18 100
 */
/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39 100 12 33
 *       / \  /
 *      1  18 27
 */
/**
 *             55
 *            /  \
 *         100    41
 *         /  \  /  \
 *        39  45 12 33
 *       / \  /
 *      1  18 27
 */
/**
 *            100
 *            /  \
 *          55    41
 *         /  \  /  \
 *        39  45 12 33
 *       / \  /
 *      1  18 27
 */
console.log('\n==============================================\n');
console.log('extract max 100: ', maxheap.extractMax()); // 100
/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39  27 12 33
 *       / \
 *      1  18
 */
console.log(maxheap.values); // [55,45,41,39,27,12,33,1,18]
console.log('\n==============================================\n');

console.log('extract max 55: ', maxheap.extractMax()); // 55
/**
 *             45
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 *       /
 *      1
 */
console.log(maxheap.values); // [45,39,41,18,27,12,33,1]
console.log('\n==============================================\n');

console.log('extract max 45: ', maxheap.extractMax()); // 45
/**
 *             41
 *            /  \
 *          39    33
 *         /  \  /
 *        18  27 12
 *       /
 *      1
 */
console.log(maxheap.values); // [41,39,33,18,27,12,1]
console.log('\n==============================================\n');

console.log('extract max 41: ', maxheap.extractMax()); // 41
/**
 *             39
 *            /  \
 *          27    33
 *         /     /
 *        18    12  ?????
 *       /
 *      1
 */
console.log(maxheap.values); // [39,27,33,18,1,12] ???
console.log('\n==============================================\n');

console.log('extract max 39: ', maxheap.extractMax()); // 39
/**
 *             33
 *            /  \
 *          27    12
 *         /
 *        18
 *       /
 *      1
 */
console.log(maxheap.values); // [33,27,12,18,1]
console.log('\n==============================================\n');

console.log('extract max 33: ', maxheap.extractMax()); // 33
/**
 *             27
 *            /  \
 *          18    12
 *         /
 *        1
 *
 */
console.log(maxheap.values); // [27,18,12,1]
console.log('\n==============================================\n');

console.log('extract max 27: ', maxheap.extractMax()); // 27
/**
 *             18
 *            /  \
 *           1    12
 *
 */
console.log(maxheap.values); // [18,1,12]
console.log('\n==============================================\n');

console.log('extract max 18: ', maxheap.extractMax()); // 18
/**
 *             12
 *            /
 *           1
 *
 */
console.log(maxheap.values); // [12,1]
console.log('\n==============================================\n');

console.log('extract max 12: ', maxheap.extractMax()); // 12
/**
 *             1
 *
 */
console.log(maxheap.values); // [1]
console.log('\n==============================================\n');

console.log('extract max 1: ', maxheap.extractMax()); // 1
console.log(maxheap.values); // []
console.log('\n==============================================\n');

console.log('extract max undefined/empty: ', maxheap.extractMax()); // undefined
console.log(maxheap.values); // []
console.log('\n==============================================\n');
