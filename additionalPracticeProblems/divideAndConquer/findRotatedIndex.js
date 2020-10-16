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

// TESTING:

let t1 = [3, 4, 1, 2];
let t2 = [6, 7, 8, 9, 1, 2, 3, 4];
let t3 = [6, 7, 8, 9, 1, 2, 3, 4];
let t4 = [37, 44, 66, 102, 10, 22];
let t5 = [6, 7, 8, 9, 1, 2, 3, 4];
let t6 = [11, 12, 13, 14, 15, 16, 3, 5, 7, 9];
// t1-t6 will falsely work in some code (bc split point is either at mid / no target)
let t7 = [3, 4, 5, 6, 7, 8, 9, 1, 2];
// t7 works for all edge cases (even where you have a very unbalanced rotation)

console.log('test array: ', t1);
console.log('naive rIdx: ', findRotatedIndexNaive(t1, 4)); // 1
console.log('logN rIdx: ', findRotatedIndex(t1, 4)); // 1
console.log('\n===============================\n');

console.log('test array: ', t2);
console.log('naive rIdx: ', findRotatedIndexNaive(t2, 8)); // 2
console.log('logN rIdx: ', findRotatedIndex(t2, 8)); // 2
console.log('\n===============================\n');

console.log('test array: ', t3);
console.log('naive rIdx: ', findRotatedIndexNaive(t3, 3)); // 6
console.log('logN rIdx: ', findRotatedIndex(t3, 3)); // 6
console.log('\n===============================\n');

console.log('test array: ', t4);
console.log('naive rIdx: ', findRotatedIndexNaive(t4, 14)); // -1
console.log('logN rIdx: ', findRotatedIndex(t4, 14)); // -1
console.log('\n===============================\n');

console.log('test array: ', t5);
console.log('naive rIdx: ', findRotatedIndexNaive(t5, 12)); // -1
console.log('logN rIdx: ', findRotatedIndex(t5, 12)); // -1
console.log('\n===============================\n');

console.log('test array: ', t6);
console.log('naive rIdx: ', findRotatedIndexNaive(t6, 16)); // 5
console.log('logN rIdx: ', findRotatedIndex(t6, 16)); // 5
console.log('\n===============================\n');

console.log('test array: ', t7);
console.log('naive rIdx: ', findRotatedIndexNaive(t7, 1)); // 7
console.log('logN rIdx: ', findRotatedIndex(t7, 1)); // 7
console.log('\n===============================\n');
