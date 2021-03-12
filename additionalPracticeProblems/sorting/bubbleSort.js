/*

BUBBLE SORT:

A sorting algorithm where the largest values bubble up to the "top" (end).
Also sometimes called "sinking sort" where the biggest values "sink" to the end.
Basically, with every pass, we can ensure the largest remaining value goes to the end, working inward from the back.

Great for: when you know your data is VERY nearly sorted (and you break out of the loops early) -- pretty rare case.

*/

let myarr = [14, 25, 18, 30, 29, 40];

// Version 1 uses the TEMP variable way of "swapping"
function bubbleSort1(arr) {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      console.log(arr, arr[j], arr[j + 1]);
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) break;
    console.log('ONE PASS COMPLETE');
  }
  return arr;
}

console.log('bubbleSort1: ', bubbleSort1(myarr));
console.log('\n===========================================================\n');

// Version 2 not optimized, but uses the ES2015 syntax for "swapping" ====> [thing1, thing2] = [thing2, thing1]
function bubbleSort2(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      console.log(arr, arr[j], arr[j + 1]);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    console.log('ONE PASS COMPLETE');
  }
  return arr;
}

console.log('bubbleSort2: ', bubbleSort2(myarr));
console.log('\n===========================================================\n');
