// ABOUT STACKS

/*

LIFO  -  LAST IN, FIRST OUT

ARRAY IMPLEMENTATION: push & pop go together, unshift & shift go together. 
    * but PUSH & POP are better bc don't require re-indexing

SINGLY OR DOUBLY LINKED LIST IMPLEMENTATION:
    * shift and unshift are better bc O(1) time, but we would "call" them push and pop
    * should return the size for push, and the removed items' value for pop

*/

// ARRAY IMPLEMENTATION:
let stack = [];
stack.push('google');
stack.push('instagram');
stack.push('youtube');
console.log('array made stack of 3: ', stack); // [google, instagram, youtube]
stack.pop(); // youtube
stack.pop(); // instagram
console.log('array made stack of 1: ', stack); // [google]

// OR
let stackk = [];
stackk.unshift('create new file');
stackk.unshift('resize file');
stackk.unshift('erased wrinkle');
console.log('array made stackk of 3: ', stackk);
stackk.shift(); // erased wrinkle
stackk.shift(); // resize file
console.log('array made stackk of 1: ', stackk); // [create new file]

// MAKE A STACK CLASS WITH A SINGLY LINKED LIST, where PUSH & POP run in O(1) constant time...
// cannot be the same as push and pop from SLL or DLL bc pop runs in O(N) time
// hint: just re-name what needs to be renamed from shift and unshift bc those are in O(1) time
class SLLStack {
  constructor() {
    this.firstOut = null;
    this.lastIn = null;
    this.size = 0;
  }
  push(val) {
    // ie unshift
    let newLastInNode = new Node(val);
    if (!this.firstOut) {
      this.firstOut = this.lastIn = newLastInNode;
    } else {
      let oldFirstOut = this.firstOut;
      this.firstOut = newLastInNode;
      this.firstOut.next = oldFirstOut;
    }
    return ++this.size;
  }
  pop() {
    // ie shift
    if (!this.firstOut) return null;
    let popped = this.firstOut;
    if (this.size === 1) {
      this.firstOut = this.lastIn = null;
    } else {
      this.firstOut = this.firstOut.next;
    }
    this.size--;
    popped.next = null; // sever the connection
    return popped.val;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

let test = new SLLStack();
console.log('\n============================================\n');
console.log('1st push size: ', test.push('first in'));
console.log('2nd push size: ', test.push('second in'));
console.log('3rd push size: ', test.push('last in'));
console.log('test full: ', test);
console.log('\n============================================\n');
console.log('1st pop: ', test.pop());
console.log('test less 1: ', test);
console.log('2nd pop: ', test.pop());
console.log('test less 2: ', test);
console.log('3rd pop: ', test.pop());
console.log('test less 3: ', test);
console.log('4th null pop: ', test.pop());
console.log('test still empty: ', test);

// TIME COMPLEXITY OF STACKS:
/*

Insertion: O(1) 
Removal: O(1)
   THE POINT IS FOR THESE TO BE CONSTANT TIME!

    for searching or setting, you wouldn't really care to use a stack
    you should use some other data structure

*/

console.log('\n============================================\n');

// ABOUT QUEUES

/*

FIFO  -  FIRST IN, FIRST OUT
  background tasks (like a printer queue)
  uploading resources etc.

ARRAY IMPLEMENTATION: unshift & pop go together, push & shift go together. 
    * but PUSH & POP are better bc don't require re-indexing

SINGLY OR DOUBLY LINKED LIST IMPLEMENTATION:

*/

// ARRAY IMPLEMENTATION:
let queue = [];

queue.push('first in');
queue.push('second in');
queue.push('third in');
console.log('array made queue of 3: ', queue);

queue.shift();
queue.shift();
console.log('array made queue of 1: ', queue);

// OR
let q = [];
q.unshift('print first');
q.unshift('print next');
q.unshift('print last');
console.log('array made q of 3: ', q);

console.log(q.pop());
console.log(q.pop());
console.log('array made q of 1: ', q);

// MAKE A QUEUE CLASS WITH A SINGLY LINKED LIST, where PUSH & POP run in O(1) constant time...
// cannot be the same as push and pop from SLL or DLL bc pop runs in O(N) time
// hint: just re-name what needs to be renamed from shift and unshift bc those are in O(1) time

class SLLQueue {
  constructor() {
    this.end = null;
    this.front = null;
    this.size = 0;
  }
  enqueue(val) {
    // ie push
    let newNode = new Node(val);
    if (!this.front) {
      this.front = this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = newNode;
    }
    return ++this.size;
  }
  dequeue() {
    // ie shift
    if (!this.front) return null;
    let popped = this.front;
    if (this.size === 1) {
      this.front = this.end = null;
    } else {
      this.front = this.front.next;
    }
    popped.next = null; // sever the connection
    this.size--;
    return popped.val;
  }
}

let testt = new SLLQueue();
console.log('\n============================================\n');
console.log('Q 1st enqueue size: ', testt.enqueue('first in'));
console.log('Q 2nd enqueue size: ', testt.enqueue('second in'));
console.log('Q 3rd enqueue size: ', testt.enqueue('last in'));
console.log('Q test full: ', testt);
console.log('\n============================================\n');
console.log('Q 1st dequeue: ', testt.dequeue());
console.log('Q test less 1: ', testt);
console.log('Q 2nd dequeue: ', testt.dequeue());
console.log('Q test less 2: ', testt);
console.log('Q 3rd dequeue: ', testt.dequeue());
console.log('Q test less 3: ', testt);
console.log('Q 4th null dequeue: ', testt.dequeue());
console.log('Q test still empty: ', testt);

// TIME COMPLEXITY OF QUEUES:
/*

Insertion: O(1) 
Removal: O(1)
   THE POINT IS FOR THESE TO BE CONSTANT TIME! just like a stack

    for searching or setting, you wouldn't really care to use a queue
    you should use some other data structure

*/
