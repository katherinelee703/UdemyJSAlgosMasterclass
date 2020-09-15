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
    let popped = this.tail;
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
  // get(idx) { // ORIGINAL VERSION
  //   if (idx < 0 || idx >= this.length) return false; // cannot get
  //   if (!this.head) return "list is empty"
  //   let counter = 0;
  //   let current = this.head;
  //   while (counter < idx) {
  //     current = current.next;
  //     counter++;
  //   }
  //   return current;
  // }
  get(idx) {
    // OPTIMIZED VERSION
    if (idx < 0 || idx >= this.length) return false; // cannot get
    if (!this.head) return 'list is empty';
    if (idx <= Math.floor(this.length / 2)) {
      let counter = 0;
      let current = this.head;
      while (counter < idx) {
        current = current.next;
        counter++;
      }
      return current;
    } else {
      // idx > Math.floor(this.length / 2)
      let counter = this.length - 1;
      let current = this.tail;
      while (counter > idx) {
        current = current.prev;
        counter--;
      }
      return current;
    }
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
    if (idx === 0) return !!this.unshift(val);

    let newNode = new Node(val);
    let place = this.get(idx);
    let next = place;
    let prev = place.prev;

    place = newNode;
    (newNode.next = next), (next.prev = newNode);
    (newNode.prev = prev), (prev.next = newNode);
    this.length++;

    return true; // or this
  }
  remove(idx) {
    if (!this.head) return 'empty list - nothing to remove';
    if (idx < 0 || idx >= this.length) return 'invalid remove request';
    if (idx === this.length - 1) return this.pop();
    if (idx === 0) return this.shift();

    let removed = this.get(idx);
    removed.prev.next = removed.next;
    removed.next.prev = removed.prev;

    (removed.next = null), (removed.prev = null);
    this.length--;

    return removed;
  }
  reverse() {
    // should just flip head&tail and prevs&nexts via [] = []
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

console.log('test empty: ', test);
console.log('art: ', test.push('ART'));
console.log('box: ', test.push('BOX'));
console.log('cat: ', test.push('CAT'));
console.log('dog: ', test.push('DOG'));
console.log('test 4 full: ', test);
console.log('pop dog: ', test.pop());
console.log('pop cat: ', test.pop());
console.log('test 2 full: ', test);
console.log('shift art: ', test.shift());
console.log('test 1 full: ', test);
console.log('unshift art: ', test.unshift('ART'));
console.log('get -1: ', test.get(-1)); // false
console.log('get 0: ', test.get(0)); // ART
console.log('get 1: ', test.get(1)); // BOX
console.log('get 2: ', test.get(2)); // false
console.log('set -1: ', test.set(-1, 'NOPE')); // false
console.log('set 0: ', test.set(0, 'ARTSY')); // true, now 0th is ARTSY
console.log('set 1: ', test.set(1, 'BOXY')); // true, now 1th is BOXY
console.log('set 2: ', test.set(2, 'NOPE')); // false
console.log('test 2 full CAPS: ', test);
console.log('insert -1: ', test.insert(-1, 'NOPE')); // false
console.log('insert 0: ', test.insert(0, 'before artsy')); // true
console.log('insert 3: ', test.insert(3, 'after boxy')); // true
console.log('insert 2: ', test.insert(2, 'middle')); // true
console.log('test 5 full ', test); // before artsy, ARTSY, middle, BOXY, after boxy
console.log('test at middle: ', test.head.next.next);
console.log('remove -1: ', test.remove(-1)); // false
console.log('remove 5: ', test.remove(5)); // false
console.log('remove 0 ', test.remove(0)); // shifts before artsy
console.log('remove 2 ', test.remove(1)); // removes middle
console.log('remove 4 ', test.remove(2)); // pops after boxy
console.log('test 2 full CAPS: ', test); // ARTSY <--> BOXY only, length 2
console.log('insert middle: ', test.insert(1, 'MIDDLE')); // true, now its ARTSY <--> MIDDLE <--> BOXY
console.log('test reversed: ', test.reverse()); // BOXY <--> MIDDLE <--> ARTSY, length 3
console.log('test reversed to original: ', test.reverse()); // back to ARTSY <--> MIDDLE <--> BOXY, length 3
console.log('test final form: ', test); // ARTSY <--> MIDDLE <--> BOXY, length 3

/*

TIME COMPLEXITY FOR DOUBLY LINKED LISTS

Insertion O(1)
Removal O(1)
Searching O(N)
Access O(N)

    Technically searching is O(N/2), but that still reduces to O(N);

Almost the same as Singly Linked Lists, except for the additional pointer to "prev" nodes
  This can work well for things like browser history (often a doubly linked list) so you can see what you most recently did

DLL does take up a LOT of memory considering storing the extra pointer (compared to SLL), but it does make it convenient to do a few useful things noted above :)

*/
