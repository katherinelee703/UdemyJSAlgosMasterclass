// ABOUT MERGE SORT:
// It: splits up, sorts, and merges
// It is a "divide and conquer" style sorting algorithm
// It takes advantage of the fact that arrays of length 0 or 1 are always sorted

// METHOD:
// Split the given array in half, all the way down until all items are length 1 arrays
// Compare the 2 arrays and combine to become a length 2 array,
// Then compare and combine to become a length 4 array, etc etc (USE RECURSION)
// Repeat until you have recombined the whole of the given array and it is in sorted order

// BREAK IT DOWN INTO 2 FUNCTIONS:

// FIRST:
// Make a function to MERGE 2 SORTED ARRAYS
// It should run in O(N + M) time, and take O(N + M) space - should not mutate the inputs

function merge2SortedArrays(arr1, arr2) {
  let finalArr = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      finalArr.push(arr1[i]);
      i++;
    } else {
      finalArr.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    finalArr.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    finalArr.push(arr2[j]);
    j++;
  }
  return finalArr;
}

let sorted1 = [1, 10, 50];
let sorted2 = [2, 14, 99, 100];

console.log('merge2SortedArrays: ', merge2SortedArrays(sorted1, sorted2));
// expect [1,2,10,14,50,99,100];
console.log('merge2SortedArrays2: ', merge2SortedArrays([1, 3, 6], [2, 7]));
// expect [1,2,3,6,7]

// SECOND :
// Write a recursive function that "splits" the arrays into a "left" and "right" half until each "split" is of length 1
// Then it will call the merge2SortedArrays function on each side of recursive result of the "splitting" and bubble back up

function mergeSort(arr) {
  // I first called this function "splitter" to help remember what it does
  // base case, length is 1
  if (arr.length <= 1) {
    console.log(arr);
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge2SortedArrays(left, right);
}

console.log('first: ', mergeSort([1, 3, 2, 4, 5])); // expect [1,2,3,4,5]
console.log('second: ', mergeSort([99, 1, 2, 50, 25, 100, 14])); // expect [1,2,14,25,50,99,100]

/*
 ___________________________________________
|  Best TC  |  AVG TC  | Worst TC | Space C |
|___________|__________|__________|_________|
|  O(NlogN) | O(NlogN) | O(NlogN) |  O(N)   |
|___________|__________|__________|_________|

*/
