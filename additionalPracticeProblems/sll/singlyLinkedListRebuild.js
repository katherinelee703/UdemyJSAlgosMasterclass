// SINGLY LINKED LIST SECTION
// REBUILD FUNCTIONS OF A SLL:
//

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SLL {
  constructor(val) {
    this.head = this.tail = null;
    this.length = 0;
  }
  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;

    return this;
  }
  pop() {
    if (!this.head) {
      return undefined;
    } else {
      let oldTail = this.head;
      let newTail = oldTail;
      while (oldTail.next) {
        newTail = oldTail;
        oldTail = oldTail.next;
      }
      this.tail = newTail;
      this.tail.next = null;
      this.length--;
      if (this.length === 0) {
        this.head = this.tail = null;
      }
      return oldTail;
    }
  }
  get(idx) {
    if (idx < 0 || idx >= this.length) return null;
    let current = this.head;
    let counter = 0;
    while (counter < idx) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(idx, val) {
    if (idx < 0 || idx >= this.length) return false;
    let toSet = this.get(idx);
    if (!toSet) return false;
    toSet.val = val;
    return true;
  }
  insert(idx, val) {
    if (idx < 0 || idx > this.length) return false;
    if (idx === this.length) return !!this.push(val);
    let counter = 0;
    let current = this.head;
    let prev;
    while (counter < idx) {
      prev = current;
      current = current.next;
      counter++;
    }
    let newNode = new Node(val);
    prev.next = newNode;
    newNode.next = current;
    this.length++;
    return true;
  }
  shift() {
    if (!this.head) return undefined;
    let oldHead = this.head;
    this.head = oldHead.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    oldHead.next = null;
    return oldHead;
  }
  remove(idx) {
    if (idx < 0 || idx >= this.length) return undefined;
    if (idx === this.length - 1) return this.pop();
    if (idx === 0) {
      //return this.shift();
      if (!this.head) return undefined;
      let oldHead = this.head;
      this.head = oldHead.next;
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }
      oldHead.next = null;
      return oldHead;
    }
    let counter = 0;
    let current = this.head;
    let prev;
    while (counter < idx) {
      prev = current;
      current = current.next;
      counter++;
    }
    prev.next = current.next;
    current.next = null;
    this.length--;
    return current;
  }
  rotate(idx) {
    if (idx < 0) {
      // ie rotate right
      let counter = 0;
      while (counter > idx) {
        let oldHead = this.head;
        let oldTail = this.tail;
        this.head = oldTail;
        this.head.next = oldHead;
        let current = this.head;
        while (current.next !== this.head) {
          current = current.next;
        }
        current.next = null;
        this.tail = current;
        counter--;
      }
      return this;
    }
    // ie rotate left
    let counter = 0;
    while (counter < idx) {
      let newHead = this.head.next;
      let oldHead = this.head;
      this.head = newHead;
      this.tail.next = oldHead;
      oldHead.next = null;
      this.tail = oldHead;
      counter++;
    }
    return this;
  }
}
