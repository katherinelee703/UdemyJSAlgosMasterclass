/*

Frequency Counter Pattern Practice:

Example Problem 1:

Make a function called "sameSquared".
The function takes in 2 arrays.
Check that for each value in the first array, you can find its square in the second array.
The frequency must match, not just simply exist once.

*/

let t1 = [1, 2, 3];
let t2 = [1, 9, 4];

let t3 = [1, 1, 2];
let t4 = [1, 4, 4];

let t5 = [1, 2, 3];
let t6 = [1, 9];

let t7 = [1, 2, 3, 4, 5, 6, 6];
let t8 = [36, 36, 25, 16, 9, 4, 4];
let t9 = [36, 36, 25, 16, 9, 4, 1];

function sameSquared(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let freqCounter = {};

  for (let i = 0; i < arr1.length; i++) {
    let a1sq = arr1[i] * arr1[i];
    if (freqCounter[a1sq]) {
      freqCounter[a1sq]--;
    } else {
      freqCounter[a1sq] = 1;
    }
  }

  for (let j = 0; j < arr2.length; j++) {
    if (freqCounter[arr2[j]]) {
      freqCounter[arr2[j]]--;
    } else {
      freqCounter[arr2[j]] = 1;
    }
  }

  for (let key in freqCounter) {
    if (freqCounter[key] !== 0) return false;
  }

  return true;
}

// O(N) time; we have to touch each element once
// O(N) space; in the worst case the freqCounter object will grow as big as the 2 inputs' length if none of them match

console.log('test 1: ', sameSquared(t1, t2)); // expect true
console.log('test 2: ', sameSquared(t3, t4)); // expect false
console.log('test 3: ', sameSquared(t5, t6)); // expect false
console.log('test 4: ', sameSquared(t7, t8)); // expect false
console.log('test 5: ', sameSquared(t7, t9)); // expect true

console.log('======================\n');

// // the Exponentiation Operator in JavaScript is **
// console.log(3 ** 2); // 9
// console.log(2 ** 5); // 32
// console.log(Math.pow(3,3)); // 27

//===================================================================================================

/*
 
Example Problem 2: 

Make a function called validAnagram.
Given 2 strings, check if 1 string is an anagram of the other string.
An anagram means the same letter occurs the same number of times in both strings, but the location of the letter doesn't matter

*/

let s1 = '';
let s2 = '';

let s3 = 'anagram';
let s4 = 'nagaram';

let s5 = 'awesome';
let s6 = 'awesom';

let s7 = 'qwerty';
let s8 = 'tertwq';

// optimize 1: update from how code above looked to now use ternary operation instead of if else statements
// optimize 2: remove 3rd loop (for in) and deal with the logic in the 2nd loop instead

function validAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  let freqCounter = {};

  for (let i = 0; i < str1.length; i++) {
    freqCounter[str1[i]] ? freqCounter[str1[i]]++ : (freqCounter[str1[i]] = 1);
  }

  for (let j = 0; j < str2.length; j++) {
    if (!freqCounter[str2[j]]) {
      // this character didn't exist in first string || char is 0, and !0 is true so go inside...
      return false;
    }
    freqCounter[str2[j]]--; // this is giving a chance to count downward
  }

  return true;
}

console.log('test 1: ', validAnagram(s1, s2)); // expect true;
console.log('test 2: ', validAnagram(s3, s4)); // expect true;
console.log('test 3: ', validAnagram(s5, s6)); // expect false;
console.log('test 4: ', validAnagram(s7, s8)); // expect false;

console.log('!0 is: ', !0 ? 'true' : 'false'); // expect true
console.log('0 is: ', 0 ? 'true' : 'false'); // expect false
