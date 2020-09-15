// ABOUT DOUBLY LINKED LISTS
// more memory = more flexibility
// will be better than singly linked lists at a few things (pop)

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return 'no items in list - nothing to remove';
    let popped = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return popped;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      popped.prev = null; // don't forget to chop this off so no one can accidentally access the list from that node somehow
    }
    this.length--;
    return popped;
  }
  shift() {
    if (!this.head) return 'list empty - nothing to remove';
    if (this.length === 1) {
      let removed = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return removed;
    }
    let removed = this.head;
    this.head = this.head.next;
    this.head.prev = null;
    removed.next = null;
    this.length--;
    return removed;
  }
  unshift(val) {
    let newHead = new Node(val);
    if (!this.head) {
      this.head = this.tail = newHead;
      this.length++;
      return this;
    }
    newHead.next = this.head;
    this.head.prev = newHead;
    this.head = newHead;
    this.length++;
    return this;
  }
  get(idx) {
    if (idx < 0 || idx >= this.length) return false; // cannot get
    if (!this.head) return 'list is empty';
    let counter = 0;
    let current = this.head;
    while (counter < idx) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(idx, val) {
    let toSet = this.get(idx);
    if (toSet) {
      toSet.val = val;
      return true;
    }
    return false;
  }
  insert(idx, val) {
    if (idx < 0 || idx > this.length) return false;
    if (idx === this.length) return !!this.push(val);
    if (idx === 0) return this.unshift(val);
    let newNode = new Node(val);
    let place = this.get(idx);
    let next = place;
    let prev = place.prev;

    place = newNode;
    newNode.next = next;
    next.prev = newNode;
    newNode.prev = prev;
    prev.next = newNode;
    this.length++;

    return this; // or true
  }
  remove(idx) {
    if (!this.head) return 'empty list - nothing to remove';
    if (idx < 0 || idx > this.length) return 'invalid remove request';
    if (idx === this.length) return this.pop();
    if (idx === 0) return this.shift();
    let removed = this.get(idx);
    removed.prev.next = removed.next;
    removed.next.prev = removed.prev;
    return removed;
  }
  reverse() {
    // should just flip head&tail and prevs&nexts via [] = [] ??
    let current = this.head;
    while (current) {
      [current.prev, current.next] = [current.next, current.prev];
      current = current.prev;
    }
    [this.head, this.tail] = [this.tail, this.head];
    return this;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

let test = new DoublyLinkedList();
test.push(4);
test.push(8);
test.push(12);
test.pop();
test.pop();
test.pop();
console.log('empty test: ', test);

test.push(4);
test.push(8);
test.push(12);
test.shift();
test.shift();
test.shift();
test.unshift(12);
test.unshift(8);
test.unshift(4);
test.push(16);
test.get(3); // 16
test.get(2); // 12
test.get(-1); // error
test.get(0); // 4
test.set(0, 0); // sets 0th to 0
test.set(0, 4); // sets 0th back to 4 again
test.set(4, 111); // false
test.insert(1, 6);
// console.log(test.length)
test.insert(5, 999);
// console.log(test)
test.insert(0, 'HI'); // "HI" 4 6 8 12 16 999  --- length 7, head "HI" tail 999
test.remove(0);
test.remove(-1);
test.remove(1000);
test.remove(6);
console.log('test after all operations: ', test.reverse()); // expect 16 12 8 6 4  --- length 5, head 16 tail 4
