// ABOUT RADIX SORT

/*

NOT a COMPARISON sorting algorithm. It is an INTEGER sorting algorithm.
It takes advantage of the special properties of integers, in this case, base 10 integers.
It utilizes 10 'buckets' by which we sort and resort items from the unordered list/array.
We start with the 1s place. then the 10s. then the 100s. etc.
Based on the length of the largest number, that is how many interations we will have.

*/

// STEP 1
// Helper function for get digit

function getDigit(num, place) {
  // first method -- little clunky
  // num = num.toString().split("")
  // return Number(num[num.length - 1 - place]);

  // second method, math Based
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  // abs is for in case you have negative numbers,
  // math.pow takes 10 to the place's power, which is the digit place you'd have to divide by
  // take the floor of that number, and call modulus 10 to get the remainder. The remainder is the digit you are looking for
  // ex: given 7895 and 2, you take Math.floor(7895 / 10^2) and then % 10
  //     which is 7895 / 100 = 78.95, then floor, you get 78.
  //     78 % 10 is remainder 8.
  // the digit at the reverse-index (counting 0th place as the one's column) is the digit you wanted from getDigit
  //  7   *8    9    5
  // 3rd  2nd  1st  0th indexes
}

console.log('get 0th digit for 1846 (expect 6): ', getDigit(1846, 0)); // expect 6
console.log('\n===================================================\n');

// STEP 2
// Helper function for counting how many digits are in a number

function digitCount(num) {
  // easy way -- but clunky
  // return num.toString().length;

  // math way
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

console.log('digit count or 3456 should be 4: ', digitCount(3456)); // expect 4
console.log('\n===================================================\n');

// STEP 3
// Helper function for getting the number of digits of the largest number in the array

function maxDigits(arr) {
  let runningMax = digitCount(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    runningMax = Math.max(digitCount(arr[i]), runningMax);
  }
  return runningMax;
}

console.log(
  'max digits of [1,22,333,4444] shoudl be 4: ',
  maxDigits([1, 333, 4444, 22])
); // expect 4
console.log('\n===================================================\n');

// STEP 4
// Real function for Radix Sort

function radixSort(arr) {
  let mostDigits = maxDigits(arr); // tells you how many times you have to loop thru to get it completely sorted

  for (let i = 0; i < mostDigits; i++) {
    // making the digit sorting bucket (from 0 to 9, hence length: 10) here will clear it to 10 empty [] on each iteration
    let bucket = Array.from({ length: 10 }, () => []);
    console.log(bucket);
    // now loop through each element in the given array, to sort it by the ith digit placement
    for (let j = 0; j < arr.length; j++) {
      // the ith digit we are on...
      let digit = getDigit(arr[j], i);
      // at that digit's array within the sorting bucket, put the current element
      bucket[digit].push(arr[j]);
    }
    // now re-collect them into a 2nd array, so we can get a new and improved order
    // using ... spread operator helps eliminate lots of steps/looping, will preserve order as well
    // remember ... spread only works shallowly!
    arr = [].concat(...bucket);
    console.log('post concat: ', arr);
  }

  return arr;
}

console.log(
  'radix sort on [4,22,1,2378,999,0]: --> ',
  radixSort([4, 22, 1, 2378, 999, 0])
); // expect [0,1,4,22,999,2378];
console.log('\n===================================================\n');

/*
 ___________________________________________
|  Best TC  |  AVG TC  | Worst TC | Space C |
|___________|__________|__________|_________|
|   O(NK)   |  O(NK)   |  O(NK)   | O(N+K)  |
|___________|__________|__________|_________|

Where N is the number of items in the list/array
Where K is the number of digits in the largest number (sometimes called "wordsize")

Because we have to sort into the bucket K number of times
And because we then have to check each item once when deciding which bucket it goes into on that iteration

This can be great if you have many numbers of similar digit lengths,
but can be terrible if you have maybe just a few really small numbers, and just a few REALLY LARGE numbers, 
because you'll have to sort by the largest number's amount of digits in length

*/
