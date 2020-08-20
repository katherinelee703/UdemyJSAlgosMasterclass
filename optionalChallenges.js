/*

Example Problem 1: 

Write a function called sameFrequency.
Given 2 positive integers, find out if the 2 numbers have the same frequency of digits.
Solution must have O(N) time complexity.

*/

function sameFrequency(num1, num2) {
  let n1 = num1.toString().split('');
  let n2 = num2.toString().split('');

  if (n1.length !== n2.length) return false;

  let freqCounter = {};

  for (let i = 0; i < n1.length; i++) {
    freqCounter[n1[i]] ? (freqCounter[n1[i]] += 1) : (freqCounter[n1[i]] = 1);
  }

  for (let i = 0; i < n2.length; i++) {
    freqCounter[n2[i]] ? (freqCounter[n2[i]] -= 1) : (freqCounter[n2[i]] = 1);
  }

  for (let key in freqCounter) {
    if (freqCounter[key] !== 0) return false;
  }

  return true;
}

// O(N+M) time, because we must check the frequency of each digit in each of the 2 arrays (may have diff lengths, hence N & M)
// O(N+M) space because we have to set n1 and n2 to be arrays of the lengths of first and second input nums' digits

console.log('test 1a: ', sameFrequency(182, 281)); // expect true
console.log('test 2a: ', sameFrequency(34, 14)); // expect false
console.log('test 3a: ', sameFrequency(3589578, 5879385)); // expect true
console.log('test 4a: ', sameFrequency(22, 222)); // expect false

console.log('\n=======================================\n');

/*

Example Problem 2: 

Write a function called areThereDuplicates.
It accepts a variable number of arguments and checks whether there are duplicates among the inputs.
Can be solved with frequency counter method, or the multiple pointers method.

*/

function areThereDuplicates1(...args) {
  let arggs = [...args];
  let argsHash = {};
  let result = false;
  arggs.forEach((arg) => {
    argsHash[arg] ? (result = true) : (argsHash[arg] = arg);
  });
  return result;
}

// O(N) time, due to forEach
// O(N) space, due to argsHash

function areThereDuplicates2(...args) {
  return new Set(args).size !== args.length;
}

// O(N) time, due to Set
// O(N) space, due to Set

// VERSION 1: using flag / frequency counter
console.log('test 1b: ', areThereDuplicates1(1, 2, 3)); // expect false
console.log('test 2b: ', areThereDuplicates1(1, 2, 2)); // expect true
console.log('test 3b: ', areThereDuplicates1('a', 'b', 'c', 'a')); // expect true

console.log('\n=======================================\n');

// VERSION 2: one liner using Sets
console.log('test 1c: ', areThereDuplicates2(1, 2, 3)); // expect false
console.log('test 2c: ', areThereDuplicates2(1, 2, 2)); // expect true
console.log('test 3c: ', areThereDuplicates2('a', 'b', 'c', 'a')); // expect true

console.log('\n=======================================\n');

/*

Example Problem 3: 

Write a function called averagePair.
Given a sorted array of integers & target average, determine if there is a pair in the array that have the target average.
There may be more than one pair that matches the target average.
Solution must be in O(N) time, O(1) space

*/

function averagePair(arr, target) {
  if (arr.length === 0) return false;
  let p2 = arr.length - 1;
  for (let p1 = 0; p1 < arr.length; p1++) {
    let avg = (arr[p1] + arr[p2]) / 2;
    if (avg === target) {
      return true;
    } else if (avg > target) {
      p2--;
      p1--;
    } else {
      // avg < target
      continue;
    }
  }

  return false;
}

// O(N) time, because in worst case we still have to go thru the length of the whole array once
// O(1) space, due to setting variables like p1, p2, and avg

console.log('test 1d: ', averagePair([1, 2, 3], 2.5)); // expect true
console.log('test 2d: ', averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // expect true
console.log('test 3d: ', averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // expect false
console.log('test 4d: ', averagePair([], 4)); // expect false
console.log('test 5d: ', averagePair([1], 4)); // expect false

console.log('\n=======================================\n');

/*

Example Problem 4: 

Write a function called isSubsequence.
It takes 2 strings and checks whether the first string's characters form a subsequence of the second string's characters.
This is a subsequence, not a permutation... the order of the letters must remain the same.
Solution must be in at least O(N + M) time, O(1) space 

*/

function isSubsequence(str1, str2) {
  let p1 = 0;
  let p2 = 0;
  while (p1 < str1.length && p2 < str2.length) {
    if (str1[p1] === str2[p2]) {
      p1++;
      p2++;
    } else {
      // str1[p1] !== str2[p2]
      p2++;
    }
  }
  if (p1 === str1.length) return true;
  else return false;
}

// O(N+M) time, because we need touch each letter in str1 once, and each letter in str2 once in worst case
// O(1) space, just saving variables for p1 and p2

function isSubsequence2(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str1[0] === str2[0]) return isSubsequence2(str1.slice(1), str2.slice(1));
  else return isSubsequence2(str1, str2.slice(1));
}

// Recursive Solution takes O(N+M) space, due to worst case call stack
// O(1) time because no loops ???

// ITERATIVE VERSION:
console.log('test 1e: ', isSubsequence('hello', 'hello world')); // expect true
console.log('test 2e: ', isSubsequence('sing', 'sting')); // expect true
console.log('test 3e: ', isSubsequence('abc', 'abracadabra')); // expect true
console.log('test 4e: ', isSubsequence('abc', 'acb')); // expect false

console.log('\n=======================================\n');

// RECURSIVE VERSION:
console.log('test 1f: ', isSubsequence('hello', 'hello world')); // expect true
console.log('test 2f: ', isSubsequence('sing', 'sting')); // expect true
console.log('test 3f: ', isSubsequence('abc', 'abracadabra')); // expect true
console.log('test 4f: ', isSubsequence('abc', 'acb')); // expect false

console.log('\n=======================================\n');

/*

Example Problem 5: 

Write a function called maxSubarraySum.
Given an array of integers, and a number, find the maximum sum of a subarray with the length of the number passed into func.
Note, the subarray must be of consecutive numbers in the array.
Solution must be in O(N) time, O(1) space
This is an example of sliding window method.

*/

function maxSubarraySum(arr, num) {
  if (arr.length < num) return null;
  let subSum = 0;
  for (let i = 0; i < num; i++) {
    subSum += arr[i];
  }
  let max = subSum;
  for (let j = num; j < arr.length; j++) {
    subSum = subSum - arr[j - num] + arr[j];
    max = Math.max(subSum, max);
  }
  return max;
}

console.log('test 1g: ', maxSubarraySum([100, 200, 300, 400], 2)); // expect 700
console.log('test 2g: ', maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // expect 39
console.log('test 3g: ', maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)); // expect 5
console.log('test 4g: ', maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // expect 5
console.log('test 5g: ', maxSubarraySum([2, 3], 3)); // expect null

console.log('\n=======================================\n');
