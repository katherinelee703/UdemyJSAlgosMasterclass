// ABOUT QUICK SORT

/*

Quick Sort is rather hard to explain in words, but must know that:
  1. it is RECURSIVE
  2. it uses a PIVOT POINT checking method

The runtime depends somewhat on what you pick as your PIVOT POINT.
Ideally, the pivot should be roughly the MEDIAN value -- but generally you won't be able to know that value, so...
  You can choose another strategy (1st, last, midpoint element, etc...)

  Here we will choose the 1st element as the pivot point, for simplicity's sake.
    (see notes on consequences later)
*/

function pivotHelper(arr, start = 0, end = arr.length - 1) {
  let pivotIdx = start;
  let pivot = arr[start];
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      pivotIdx++;
      [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];

      console.log(arr);
      console.log('pivot counter: ', pivotIdx);
    }
  }
  [arr[start], arr[pivotIdx]] = [arr[pivotIdx], arr[start]];
  console.log(`pivot *${pivot}* now in correct place: `, arr);
  return pivotIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIdx = pivotHelper(arr, left, right);
    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
  }
  return arr;
}

let unsorted1 = [5, 2, 1, 8, 4, 7, 6, 3];
//console.log("pivot Index: ", pivotHelper(unsorted1)); // should return 4, the index where 5 MUST be
console.log(`unsorted: [${unsorted1}] --> sorted: `, quickSort(unsorted1));
console.log(
  '\n=============================================================\n'
);

/*
 ___________________________________________
|  Best TC  |  AVG TC  | Worst TC | Space C |
|___________|__________|__________|_________|
|  O(NlogN) | O(NlogN) |  O(N^2)  | O(logN) |
|___________|__________|__________|_________|

The worst case is when you use quick sort on an array that is already sorted.
If you choose the smallest element as the pivot point, or the largest, you will have to do N decompositions, instead of logN decompositions.
Since we do N comparisons for every decomposition, this worse case is N (comparisons) * N (decompositions),
whereas the average on a randomly unsorted array is more like N (comparisons) * log N (decompositions).

One way to avoid the Worst case Time Complexity is to not pick the first element in the array (just in case its sorted).
Instead we could always pick the pivot point to be the middle element.
Or a randomly selected element. 
This should generally help avoid the worst case, but you can never avoid the worst case entirely.
There may always be that one array that no matter what you pick as the pivot, it ends up being the minimum every time.

*/
