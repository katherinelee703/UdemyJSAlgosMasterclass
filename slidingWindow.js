/*

Example Problem 1: 

Write a function called maxSubarraySum.
It accepts an array of integers, and a number n.
The function should calculate the maximum sum of n consecutive elements in the array.


*/

let t1 = [1, 2, 5, 2, 8, 1, 5]; // given 2, should return 10 (max sum is 8 + 2 = 10)
let t2 = [1, 2, 5, 2, 8, 1, 5]; // given 4, should return 17 (max sum is 2 + 5 + 2 + 8 = 17)
let t3 = [4, 2, 1, 6]; // given 1, should return 6 (just the biggest single num in the array)
let t4 = [4, 2, 1, 6, 2]; // given 4, should return 13 (max sum is 4 + 2 + 1 + 6 = 13)
let t5 = []; // given 4, should return null (it is null when the length of subarray is longer than given array)

function maxSubarraySum1(arr, n) {
  if (arr.length < n) return null;
  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length - n + 1; i++) {
    let tempSum = 0;
    for (let j = 0; j < n; j++) {
      tempSum += arr[i + j];
    }
    if (tempSum > maxSum) {
      maxSum = tempSum;
    }
  }

  return maxSum;
}

// O(N^2) time where N is length of array, as N grows, the nested for loops will take longer and longer
// O(1) space, just saving a few variables like maxSum, tempSum, i, and j

function maxSubarraySum2(arr, n) {
  if (arr.length < n) return null;
  let maxSum = 0; // just initialize these as numbers
  let tempSum = 0;
  // the initial sum of desired consecutive length is added up here:
  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }
  // at the beginning temp and max are same;
  tempSum = maxSum;
  // sliding window design is set up here:
  for (let j = n; j < arr.length; j++) {
    // temp sum moves forward by subtracting the digit at the "front" end,
    // and then adding the digit right after the "back" end (arr[n])
    tempSum = tempSum - arr[j - n] + arr[j];
    maxSum = Math.max(tempSum, maxSum);
  }

  return maxSum;
}

// O(N) time where N is length of array, only have to go thru array once til the end with sliding window doing minimal operations
// O(1) space, just saving a few variables like maxSum, tempsum, i, and j

// TEST VERSION 1
console.log('test 1: ', maxSubarraySum1(t1, 2)); // expect 10
console.log('test 2: ', maxSubarraySum1(t2, 4)); // expect 17
console.log('test 3: ', maxSubarraySum1(t3, 1)); // expect 6
console.log('test 4: ', maxSubarraySum1(t4, 4)); // expect 13
console.log('test 5: ', maxSubarraySum1(t5, 4)); // expect null

console.log('\n=======================================\n');

// TEST VERSION 2
console.log('test 1b: ', maxSubarraySum2(t1, 2)); // expect 10
console.log('test 2b: ', maxSubarraySum2(t2, 4)); // expect 17
console.log('test 3b: ', maxSubarraySum2(t3, 1)); // expect 6
console.log('test 4b: ', maxSubarraySum2(t4, 4)); // expect 13
console.log('test 5b: ', maxSubarraySum2(t5, 4)); // expect null
