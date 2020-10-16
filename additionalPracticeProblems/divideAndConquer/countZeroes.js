// DIVIDE & CONQUER SECTION
// COUNT ZEROES

function naiveCountZeroes(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      count = arr.length - i;
      break;
    }
  }
  return count;
}

function countZeroes(arr) {
  if (arr.length === 0) return 0;
  if (arr[arr.length - 1] === 1) return 0;
  if (arr[0] === 0) return arr.length;
  let mid = Math.floor(arr.length / 2); // this is utilized to get the O(log n) time, reduces what we have to search
  if (arr[mid] === 1) {
    return countZeroes(arr.slice(mid + 1));
    // no need to count that 1 at mid, so move it over 1 more in the slice to save time
  } else {
    return arr.length - mid + countZeroes(arr.slice(0, mid));
    // we want to count whole back end, so we can get that by using
    // (length - mid), then + however many 0s come back from searching the front half in the recursive call
  }
}

console.log('\n===============================\n');
console.log('COUNT ZEROES: ');
console.log('\n===============================\n');

let arr1 = [1, 1, 1, 0, 0, 0, 0, 0, 0];
console.log('test array: ', arr1);
console.log('1naive: ', naiveCountZeroes(arr1)); // 6
console.log('1logN: ', countZeroes(arr1)); // 6

console.log('\n===============================\n');
let arr2 = [1, 0, 0, 0, 0, 0, 0, 0, 0];
console.log('test array: ', arr2);
console.log('2naive: ', naiveCountZeroes(arr2)); // 8
console.log('2logN: ', countZeroes(arr2)); // 8

console.log('\n===============================\n');
let arr3 = [1, 1, 1, 1, 1, 1];
console.log('test array: ', arr3);
console.log('3naive: ', naiveCountZeroes(arr3)); // 0
console.log('3logN: ', countZeroes(arr3)); // 0

console.log('\n===============================\n');
let arr4 = [0, 0, 0, 0];
console.log('test array: ', arr4);
console.log('4naive: ', naiveCountZeroes(arr4)); // 4
console.log('4logN: ', countZeroes(arr4)); // 4

console.log('\n===============================\n');
let arr5 = [1, 1, 0, 0, 0, 0, 0, 0, 0];
console.log('test array: ', arr5);
console.log('5naive: ', naiveCountZeroes(arr5)); // 7
console.log('5logN: ', countZeroes(arr5)); // 7

console.log('\n===============================\n');
