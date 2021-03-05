/*

SELECTION SORT:

Similar to Bubble Sort, but builds the sorted part of the array in the opposite direction.
The smallest values are selected and put into their sorted positions from the beginning of the arrray.

Basically, with each pass, we ensure the minimum remaining value goes to the front, working 1 index toward the back each time

Great for: situations similar to bubble sort (mostly sorted data)
  * the only way you could really consider this "better" than bubble sort is if you are concerned about saving on "writing to memory". 
	In bubble sort we do tons of actual swapping. In selection sort, we do tons of comparisons, but only 1 swap per loop if needed. 

*/

function comparator(a, b) {
  if (a > b) return 1;
  else if (a < b) return -1;
  return 0;
}

function selectionSort(arr, comparator) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (comparator(arr[lowest], arr[j]) > 0) {
        lowest = j;
      }
    }
    if (lowest !== i) {
      // use ES6 swap:
      [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
      // let temp = arr[i];
      // arr[i] = arr[lowest];
      // arr[lowest] = temp;
    }
  }
  return arr;
}

let unsorted1 = [5, 2, 3, 1, 4, 6];
let unsorted2 = [3, 2, 5, 6, 4, 1];

console.log(
  `unsorted1: [${unsorted1}] --> sorted:`,
  selectionSort(unsorted1, comparator)
);
console.log(
  `unsorted2: [${unsorted2}] --> sorted:`,
  selectionSort(unsorted2, comparator)
);

// O(N^2) time, due to nested loops.
// In best case [1,2,3,5,4] you can get close to linear time, but doesn't matter.
