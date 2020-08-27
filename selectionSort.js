/*

SELECTION SORT:

Similar to Bubble Sort, but builds the sorted part of the array in the opposite direction.
The smallest values are selected and put into their sorted positions from the beginning of the arrray.

Basically, with each pass, we ensure the minimum remaining value goes to the front, working 1 index toward the back each time

Great for: situations similar to bubble sort (mostly sorted data)
  * the only way you could really consider this "better" than bubble sort is if you are concerned about saving on "writing to memory". In bubble sort we do tons of actual swapping. In selection sort, we do tons of comparisons, but only 1 swap per loop if needed. 

*/

let unsorted1 = [25, 14, 18, 30, 29, 40];
let unsorted2 = [5, 3, 4, 1, 2];

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      //console.log("there was a swap", i, min)
    }
    //console.log("one pass done")
  }
  return arr;
}

console.log(`unsorted1: [${unsorted1}] --> sorted:`, selectionSort(unsorted1));
console.log(`unsorted2: [${unsorted2}] --> sorted:`, selectionSort(unsorted2));

// O(N^2) time, due to nested loops. In best case [1,2,3,5,4] you can get close to linear time, but doesn't matter.
