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
