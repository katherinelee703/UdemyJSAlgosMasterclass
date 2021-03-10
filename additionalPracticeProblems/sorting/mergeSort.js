// MERGE SORT

// merge just merges 2 pre-sorted arrays
function merge(leftArr, rightArr) {
  let sorted = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    let left = leftArr[leftIdx];
    let right = rightArr[rightIdx];

    if (left <= right) {
      sorted.push(left);
      leftIdx++;
    } else {
      sorted.push(right);
      rightIdx++;
    }
  }

  return [...sorted, ...leftArr.slice(leftIdx), ...rightArr.slice(rightIdx)];
}
// calling merge alone just spits out a single sorted array from the two given sorted arrays
console.log('M: ', merge([3, 5, 8], [1, 7, 13, 22])); // expect [1,3,5,7,8,13,22]

//
// mergeSort takes in an unsorted array and utilizes merge function above after splitting
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let midIdx = Math.floor(arr.length / 2);

  return merge(mergeSort(arr.slice(0, midIdx)), mergeSort(arr.slice(midIdx)));
}

// calling mergeSort on a single unsorted array will split it until it becomes length 1 or less
// then will merge the smallest parts using the merge function that takes 2 already sorted arrays
// the small arrays are guaranteed to be sorted bc they have only 1 or 0 elements
console.log('MS: ', mergeSort([4, 8, 2, 6, 10, 0, 12, 14, -2]));
