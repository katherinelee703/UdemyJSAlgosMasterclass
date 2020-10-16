// DIVIDE & CONQUER SECTION
// SORTED FREQUENCY

// Naive Version:
function sortedFrequency(arr, target) {
  if (arr.length === 0) return -1;
  if (arr[0] === target && arr[arr.length - 1] === target) return arr.length;
  if (arr[arr.length - 1] < target) return -1;
  if (arr[0] > target) return -1;
  let targetCount = 0;
  let mid = Math.floor(arr.length / 2);
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr[i])
    if (arr[i] === target) {
      targetCount++;
    }
    if (arr[i] > target) {
      break;
    }
  }

  return targetCount;
}

function sortedFrequency2(arr, target) {
  if (arr.length === 0) return -1;
  if (arr[0] === target && arr[arr.length - 1] === target) return arr.length;
  if (arr[arr.length - 1] < target) return -1;
  if (arr[0] > target) return -1;
  let mid = Math.floor(arr.length / 2);
  if (arr[mid] < target) {
    return sortedFrequency2(arr.slice(mid + 1), target);
  } else if (arr[mid] > target) {
    return sortedFrequency2(arr.slice(0, mid), target);
  } else {
    // arr[mid] is target
    let count = 1;
    let frontward = mid - 1;
    let backward = mid + 1;
    while (arr[frontward] === target && frontward >= 0) {
      // count how many before it changes going toward front of array
      if (arr[frontward] === target) count++;
      frontward--;
    }
    while (arr[backward] === target && backward < arr.length) {
      // count how many before it changes going toward back of array
      if (arr[backward] === target) count++;
      backward++;
    }
    return count;
  }
}
