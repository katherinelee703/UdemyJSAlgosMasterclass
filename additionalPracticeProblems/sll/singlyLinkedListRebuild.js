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
}
