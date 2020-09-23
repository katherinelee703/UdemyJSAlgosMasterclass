/**
 * ABOUT PRIORITY QUEUES:
 *
 *   A data structure where each element has an associated "priority"
 *
 *   Elements with higher priorities are served/dealt with before elements with lower priorities
 *
 *   A Priority Queue is SEPARATE from Heaps -- it is an abstract way of explaining what you want done
 *    technically you can do a priority queue using an array or a list, but it's not always the best way bc it is slow,
 *    so, often you use them with heaps to make them more efficient
 *
 *
 *   For this example, the Priority Queue will be implemented as a MIN HEAP (rather than a MAX HEAP like in my previous code)
 *     so, a lower value will be dealt with first (0 = high priority; 100 = low priority; etc).
 */

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, p) {
    // insert into heap
    // makes new node, puts in right spot based on priorty, not based on val
    let newNode = new Node(val, p);
    this.values.push(newNode);
    this.bubbleUp();
    return this.values;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return;
  }
  dequeue() {
    // extract min
    // removes root element, returns it, rearranges heap using priority, not val
    const oldMin = this.values[0];
    let newMin = this.values.pop();
    if (this.values.length === 0) return newMin;
    this.values[0] = newMin;
    this.sinkDown();
    return oldMin;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = idx * 2 + 1;
      let rightChildIdx = idx * 2 + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
        // *** //  here you could also check insert time in the case that items have the same priority,
        // *** //  and select the oldest to be dequeued first, then sort
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class Node {
  constructor(val, p) {
    this.val = val;
    this.priority = p;
    // *** // could add this.insertTime = new Date.now() to track the order of things being inserted
  }
}

let ER = new PriorityQueue();

ER.enqueue('coughing', 5);
ER.enqueue('broken arm', 2);
ER.enqueue('heart attack', 1);
console.log('ER: ', ER); // [heart attack, 5, broken arm, 2, coughing, 1]
console.log('\n===============================================\n');

console.log('hearth attack dq: ', ER.dequeue()); // heart attack
console.log('ER: ', ER); // [broken arm, 2, coughing, 1]
console.log('\n===============================================\n');

console.log('broken arm dq: ', ER.dequeue()); // broken arm
console.log('ER: ', ER); // [coughing, 1]
console.log('\n===============================================\n');

console.log('coughing dq: ', ER.dequeue()); // coughing
console.log('ER: ', ER); // []
console.log('\n===============================================\n');

console.log('nothing to dq: ', ER.dequeue()); // undefined
console.log('ER: ', ER); // []
console.log('\n===============================================\n');

/**
 *  The main problem with this example is that it will not deal with items that have the exact same priority.
 *  Yes, they will be returned in order of priority, but it will NOT return in insert order (as a normal queue would preserve)
 *
 *  You can add logic at the *** lines
 *
 *
 *     TIME COMPLEXITY OF BINARY HEAPS & PRIORITY QUEUES:
 *
 *     Insertion : O(log N) // really means log base 2 of N
 *     Deletion  : O(log N)
 *       because each time you go up the heap tree to insert, you have the # of levels of comparisons to make
 *
 *     Binary Heaps are NOT optimized to do SEARCHING - so the search time is O(N) linear
 *                                                      (you'd have to check every single node bc siblings aren't ordered)
 *
 */
