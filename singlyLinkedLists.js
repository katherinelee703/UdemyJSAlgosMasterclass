// ABOUT SINGLY LINKED LISTS

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    if (this.length === 0 || !this.head) {
      this.head = new Node(val);
      this.tail = this.head;
      this.length++;
    } else {
      this.tail.next = new Node(val);
      this.length++;
      this.tail = this.tail.next;
    }
    return this;
  }
  pop() {
    if (!this.head) {
      return 'list empty - nothing to pop';
    } else {
      let current = this.head;
      let newTail = current;
      while (current.next) {
        newTail = current;
        current = current.next;
      }
      this.tail = newTail;
      this.tail.next = null;
      this.length--;
      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }
      return current;
    }
  }
  shift() {
    if (!this.head) {
      return 'list empty - nothing to remove';
    } else {
      let temp = this.head;
      this.head = temp.next;
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }
      return temp;
    }
  }
  unshift(val) {
    if (!this.head) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      let newHead = new Node(val);
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length++;
    return this;
  }
  get(idx) {
    // given a position (idx), return node at position
    if (idx < 0 || idx >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter < idx) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(idx, val) {
    // given an idx, change value of node at idx
    let toSet = this.get(idx);
    if (!toSet) return false;
    toSet.val = val;
    return true;
  }
  insert(idx, val) {
    // given an idx, add new node at that idx
    if (idx < 0 || idx > this.length) return false;
    if (idx === this.length) return !!this.push(val); // coerces to boolean
    if (idx === 0) return !!this.unshift(val); // coerces to boolean

    let newNode = new Node(val);
    let before = this.get(idx - 1);

    newNode.next = before.next;
    before.next = newNode;
    this.length++;
    return true;
  }
  remove(idx) {
    // given an idx, remove node at idx
    if (idx < 0 || idx >= this.length)
      return 'no such index - nothing to remove';
    if (idx === this.length - 1) return this.pop();
    if (idx === 0) return this.shift();

    let before = this.get(idx - 1);
    let removed = this.get(idx);
    before.next = removed.next; // or before.next = before.next.next;
    this.length--;
    return removed;
  }
  reverse() {
    // recursive?? in place
    let node = this.head;
    [this.head, this.tail] = [this.tail, this.head];
    let prev = null;
    let next = null;
    while (node) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
  print() {
    // optional, this just is useful to check that reverse worked properly
    let current = this.head;
    let arr = [];
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// TESTS for each instance method:

// let tester1 = new SinglyLinkedList();
// // console.log(tester1);
// tester1.push(5);
// // console.log(tester1);
// tester1.push(10);
// // console.log(tester1);
// tester1.push(15);
// // console.log(tester1);
// console.log("tester1 after pushing 3: ", tester1);
// console.log("pop 1: ", tester1.pop()); // expect Node { val: 15, next: null }
// console.log("pop 2: ", tester1.pop()); // expect Node { val: 10, next: null }
// console.log("pop 3: ", tester1.pop()); // expect Node { val: 5, next: null }
// console.log("pop 4: ", tester1.pop()); // expect list empty - nothing to pop
// console.log("tester1 now: ", tester1); // SinglyLinkedList { head: null, tail: null, length: 0 }
// tester1.push(5);
// tester1.push(10);
// tester1.push(15);
// console.log("tester1 after pushing 3: ", tester1);
// console.log("shift 1: ", tester1.shift()); // expect 5
// console.log("list now: ", tester1);
// console.log("unshift 1: ", tester1.unshift(5));

let tester2 = new SinglyLinkedList();
console.log('tester2: ', tester2);
tester2.unshift('C');
tester2.unshift('B');
tester2.push('D');
tester2.unshift('A');
tester2.push('E');
tester2.get(3); // "D"
tester2.get(0); // "A"
tester2.get(5); // null
tester2.get(4); // "E"
tester2.set(2, 'SEE'); // true
tester2.get(2); // "SEE"
tester2.set(10, 'lol'); // false
tester2.insert(1, '&'); // A->&->B->SEE->D->E
tester2.insert(6, 'eff!'); // A->&->B->SEE->D->E->eff! (using push)
// console.log(tester2.insert(100, "hi")); // false
console.log('tester 2: ', tester2);
console.log('remove 1: ', tester2.remove(1)); // val: &
console.log(tester2); // A B SEE D E eff!
console.log('reverse 1: ', tester2.reverse());
console.log('print 1: ', tester2.print());

/*

SINGLY LINKED LISTS TIME COMPLEXITIES:

Insertion: O(1) (push, unshift)

Removal: it depends.. 
    O(1) (pop, shift) 
    or 
    O(N) (removing from the end or middle bc we need the 1 previous to that place as well as the pace itself)

Searching: O(N), worst case is N bc it could be the very last thing 

Access: O(N), getting a certain node depends on how far down the list you need the item from

**** SLL win at insertion & deletion
     but
     Arrays win at searching & accessing (random access)
*/
