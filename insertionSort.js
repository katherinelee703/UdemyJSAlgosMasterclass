function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i]; // saving the one that will be inserted elsewhere
    let j = i - 1;
    for (j; j >= 0 && arr[j] > curr; j--) {
      // what to do when it isn't yet place to insert...
      arr[j + 1] = arr[j];
      // copy over the value at j, to the j+1 place.
    }
    // the loop has broken which means we found insertion point
    arr[j + 1] = curr;
  }
  // when we have finished placing all arr elements both loops finish
  // arr should be sorted smalled to largest
  return arr;
}

// O(N^2) time, due to having to compare each to each (nested for loops),
// but isn't too bad when data is mostly sorted to begin with (approaches O(N) time)
// is good for "online algorithm" (algo that can work as data is coming in, doesn't need whole array at once)
// bc we insert to correct position one at a time going ---> this way, if more data is being added to the end
// of the array, the insertion sort will just eventually get to it, and put it in the right place.
// However, it will get progressively slower the longer the input gets
// O(1) space complexity, but has lots of overwriting, so if "write heavy" operations are not wanted, this isn't good option
let unsorted1 = [18, 14, 25, 30, 29, 67];
let unsorted2 = [5, 3, 4, 1, 2];

console.log(`unsorted [${unsorted1}] --> sorted `, insertionSort(unsorted1));
console.log(`unsorted [${unsorted2}] --> sorted `, insertionSort(unsorted2));

/* STEP BY STEP
[3,1,4,2]

curr / arr[i/1] = 1   
			 arr[j/0] = 3   [3,3,4,2], j is -1, so j[0] is now 1 [1,3,4,2]

			 arr[i/2] = 4  
			 arr[j/1] = 3   so j[1] = curr which is 4 [1,3,4,2] no change 

			 arr[i/3] = 2
			 arr[j/2] = 4  4 greater than 2 so [1,3,4,4], 
			 arr[j/1] = 3  3 greater than 2 so [1,3,3,4],
			 arr[j/0] = 1 oops 1 less than 2, so arr[0+1] = curr, 2 [1,2,3,4]

			 outer loop done so return arr [1,2,3,4]
*/

//=====================================================

/* 

  "QUADRATIC" SORTING ALGORITHMS' TIME & SPACE COMPLEXITIES
 ___________________________________________________________
|     Algo       |  Best TC |  AVG TC  | Worst TC | Space C |
|________________|__________|__________|__________|_________|
|   Bubble Sort  |   O(N)   |  O(N^2)  |  O(N^2)  |   O(1)  |
|________________|__________|__________|__________|_________|
| Insertion Sort |   O(N)   |  O(N^2)  |  O(N^2)  |   O(1)  |
|________________|__________|__________|__________|_________|
| Selection Sort |  O(N^2)  |  O(N^2)  |  O(N^2)  |   O(1)  |
|________________|__________|__________|__________|_________|

*/
