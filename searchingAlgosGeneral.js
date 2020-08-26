function linearSearch(arr, target) {
  let idx = -1;
  for (let val of arr) {
    if (val === target) {
      idx++;
      return idx;
    } else {
      idx++;
    }
  }
  return -1;
}

// OR //

function linSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

let myarr = [1, 5, 2, 6, 8, 3, 8];

console.log('linearSearch: ', linearSearch(myarr, 6)); // expect 3 as the index
console.log('linearSearch: ', linearSearch(myarr, 12)); // expect -1
console.log('linSearch: ', linearSearch(myarr, 8)); // expect 4 as the index

console.log('\n=======================================================\n');

// NOTE: LINEAR SEARCH IS GENERALLY ALWAYS O(N), where N is the number if items in the input.

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor((start + end) / 2);

  while (arr[mid] !== target && start <= end) {
    if (target < arr[mid]) end = mid - 1;
    else if (target > arr[mid]) start = mid + 1;
    mid = Math.floor((start + end) / 2);
  }
  return arr[mid] === target ? mid : -1;
}

let myarr2 = [1, 2, 3, 4, 5, 6];

console.log('binarySearch 1: ', binarySearch(myarr2, 5));
// expect 4, because the number 2 is at the 1st index in the array
console.log('binarySearch 2: ', binarySearch(myarr2, 6));
// expect 5
console.log('binarySearch 3: ', binarySearch(myarr2, 22));
// expect -1

console.log('\n=======================================================\n');

// NOTE: BINARY SEARCH IS USUALLY IN O(log(n)) TIME! Because you can cut down by the searchable items by half each time you search for something.

function stringSearch(str, target) {
  for (let i = 0; i < str.length - target.length; i++) {
    if (str.slice(i, i + target.length) === target) {
      return true;
    }
  }
  return false;
}

console.log('strSearch 1: ', stringSearch('wowzomgzomg', 'omg')); // expect true
console.log('strSearch 2: ', stringSearch('wowzomgzomg', 'woo')); // expect false

console.log('\n=======================================================\n');

// This appears to be using sliding window method in a strange way.
// Time complexity woudl be O(N) in the worst case because we have to check all the way to the end of the string in the case that it isn't there or it is the last character.
