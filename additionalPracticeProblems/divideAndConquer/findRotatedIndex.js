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
