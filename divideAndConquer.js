// DIVIDE AND CONQUER:
// This pattern involves dividing a data set into smaller chuncks and then repeating a process with a subset of data
// Can tremendously decrease time complexity
// Quick Sort && Merge Sort are both examples of divide and conquer algorithms
// Binary Search also utilizes divide and conquer

/*

Example Problem 1: 

Write a function called search.
It takes a SORTED array of integers, and a value, and returns the index where the value is located.
If the value cannot be found in the array, return -1.


*/

let t1 = [1, 2, 3, 4, 5, 6];

function search1(arr, val) {
  if (arr.length === 0) return -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}

// O(N) time, because in worst case we have to look at every single element in the array once - AKA LINEAR SEARCH
// O(1) space, because just setting variable i

function search2(arr, val) {
  //if (arr.length === 0) return -1;

  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    if (arr[middle] < val) {
      min = middle + 1;
    } else if (arr[middle] > val) {
      max = middle - 1;
    } else {
      // arr[mid] === val
      return middle;
    }
  }

  return -1;
}

// O(log(N)) time - AKA BINARY SEARCH (find relevant half and cut down, then only continue searching in that half)
// O(1) space, because just setting variables min, max, and middle

// TEST VERSION 1:
console.log('test 1: ', search1(t1, 4)); // expect 3
console.log('test 2: ', search1(t1, 6)); // expect 5
console.log('test 3: ', search1(t1, 11)); // expect -1

console.log('\n=======================================\n');

// TEST VERSION 2:
console.log('test 1b: ', search2(t1, 4)); // expect 3
console.log('test 2b: ', search2(t1, 6)); // expect 5
console.log('test 3b: ', search2(t1, 11)); // expect -1

console.log('\n=======================================\n');
