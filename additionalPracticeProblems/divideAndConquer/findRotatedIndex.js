// DIVIDE & CONQUER SECTION
// FIND ROTATED INDEX

console.log('\n===============================\n');
console.log('FIND ROTATED INDEX: ');
// given a rotated array that was originally ordered from smallest to largest,
// find the index of the target number
// do this in O(log N) time and O(1) space
console.log('\n===============================\n');

function findRotatedIndexNaive(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function findRotatedIndex(array, value) {
  let sortedArray = array;
  let left = 0;
  let right = sortedArray.length - 1;
  let middle = Math.floor((left + right) / 2);

  while (left <= right) {
    if (sortedArray[middle] < value) {
      left = middle + 1;
    } else if (sortedArray[middle] > value) {
      right = middle - 1;
    } else if (sortedArray[middle] === value) {
      return middle;
    } else {
      return -1;
    }
    middle = Math.floor((left + right) / 2); // this line just for setting up next loop in while, uses new left & right
  }
  // if we made it here, that means we didn't find on first portion's pass
  // but is possible still exists elsewhere so,
  //reseting and searching for another part
  left = 0;
  right = sortedArray.length - 1;
  middle = Math.floor((left + right) / 2);

  let oldLeft = 0;
  let oldRight = 0;

  while (left < right && (oldLeft !== left || oldRight !== right)) {
    oldLeft = left;
    oldRight = right;

    if (sortedArray[middle] < value) {
      right = middle + 1;
    } else if (sortedArray[middle] > value) {
      left = middle + 1;
    } else {
      // sortedArray[middle] === value
      return middle;
    }
    middle = Math.ceil((left + sortedArray.length) / 2);
  }

  return -1;
}
