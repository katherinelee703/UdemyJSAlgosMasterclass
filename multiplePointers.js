/*

Example Problem 1: 

Make a function called sumZero.
It takes an array, and must return an array of the first pair that when added equals zero.
If no such pair adds up to zero, return undefined.

*/

let t1 = [-3, -2, -1, 0, 1];
let t2 = [-3, 0, 1, 4];
let t3 = [-3, -1, 0, 2, 3, 4];
let t4 = [];
let t5 = [-3, -1, 0];

function sumZero(arr) {
  if (!arr.length) return undefined;

  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) return [arr[left], arr[right]];
    else if (sum < 0) left++;
    else right--;
  }

  return undefined;
}

// O(N) time where N is array length, we have to touch each element at least once in worst case
// O(1) space, just declaring a few variables like left, right, and sum

console.log('test 1: ', sumZero(t1)); // expect [-1, 1]
console.log('test 2: ', sumZero(t2)); // expect undefined
console.log('test 3: ', sumZero(t3)); // expect [-3, 3]
console.log('test 4: ', sumZero(t4)); // expect undefined
console.log('test 5: ', sumZero(t5)); // expect undefined

console.log('\n=======================================\n');

/*

Example Problem 2: 

Make a function called "countUniqueValues".
Accepts a sorted array of numbers (may include negative numbers).
Count and return the # of unique values.

*/

let a1 = [1, 1, 1, 1, 1, 1, 2];
let a2 = [1, 2, 3, 4, 4, 7, 7, 12, 12, 13];
let a3 = []; // this should return 0
let a4 = [-2, -1, -1, 0, 1];

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let count = 1;
  let p1 = 0;
  for (let p2 = 1; p2 < arr.length; p2++) {
    if (arr[p1] === arr[p2]) {
      p1 = p2;
    }
    if (arr[p1] !== arr[p2]) {
      count++;
      p1++;
    }
  }

  return count;
}

// O(N) time where N is the length of the array
// O(1) space, because just storing that 1 count variable, and 2 pointer variables

console.log('test 1: ', countUniqueValues(a1)); // expect 2
console.log('test 2: ', countUniqueValues(a2)); // expect 7
console.log('test 3: ', countUniqueValues(a3)); // expect 0
console.log('test 4: ', countUniqueValues(a4)); // expect 4

console.log('\n=======================================\n');

function countUniqueValues2(arr) {
  if (arr.length === 0) return 0;
  let p1 = 0;
  for (let p2 = 1; p2 < arr.length; p2++) {
    if (arr[p1] !== arr[p2]) {
      p1++;
      arr[p1] = arr[p2];
    }
  }
  return p1 + 1;
}

// This ways is minimally better bc we don't need to set an extra variable for count, just use p1 + 1;
// O(N) time where N is length of array
// O(1) space, for setting 2 pointer variables

console.log('test 1: ', countUniqueValues2(a1)); // expect 2
console.log('test 2: ', countUniqueValues2(a2)); // expect 7
console.log('test 3: ', countUniqueValues2(a3)); // expect 0
console.log('test 4: ', countUniqueValues2(a4)); // expect 4
