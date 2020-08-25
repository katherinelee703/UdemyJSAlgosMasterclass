/*

Question 1: 

Write a recursive function called "reverse" which accepts a string and returns a NEW string in reverse.

*/

function reverse(str) {
  if (str.length === 1) return str[0];
  return str[str.length - 1] + reverse(str.slice(0, str.length - 1));
}

console.log('reverse hello :', reverse('hello')); // expect "olleh"
console.log('reverse awesome :', reverse('awesome')); // expect "emosewa"

console.log('\n=============================================\n');

/*

Question 2: 

Write a recursive function called "isPalindrome" which accepts a string a boolean saying whether the string is spelled the same forward and backward.

*/

function isPalindrome(str) {
  str = str.toLowerCase();
  if (str.length === 0 || str.length === 1) return true;
  if (str[0] === str[str.length - 1])
    return isPalindrome(str.slice(1, str.length - 1));
  else return false;
}

console.log('isPal racecar:', isPalindrome('racecar')); // expect true
console.log('isPal cat:', isPalindrome('cat')); // expect false
console.log('isPal tacocat:', isPalindrome('tacocat')); // expect true
console.log('isPal TaCocAt:', isPalindrome('TaCocAt')); // expect true
console.log('isPal pandemonium:', isPalindrome('pandemonium')); // expect false

console.log('\n=============================================\n');

/*

Question 3: 

Write a recursive function called "someRecursive" which accepts an array and a callback.
The function returns true if a single value in the array returns true when passed to the callback.
Otherwise it returns false.

*/

function someRecursive(arr, callback) {
  if (arr.length === 0) return false;
  if (callback(arr[0]) === true) return true;
  return someRecursive(arr.slice(1), callback);
}

function isOdd(num) {
  return num % 2 !== 0 ? true : false;
}

console.log('someRec 1:', someRecursive([1, 2, 3, 4], isOdd)); // expect true
console.log('someRec 2:', someRecursive([4, 6, 8, 9], isOdd)); // expect true
console.log('someRec 3:', someRecursive([4, 6, 8, 10], isOdd)); // expect false
console.log(
  'someRec 4:',
  someRecursive([1, 2, 3, 4], (val) => val > 10)
); // expect false

console.log('\n=============================================\n');

/*

Question 4: 

Write a recursive function called "flatten".
It accepts an array of arrays, and returns the whole thing flattened.

*/

function flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

console.log('flatten 1:', flatten([1, 2, 3, [4, 5]])); // expect [1,2,3,4,5]
console.log('flatten 2:', flatten([[1], [2], [3], [4, [5]]])); // expect [1,2,3,4,5]

console.log('\n=============================================\n');

/*

Question 5: 

Write a recursive function called "capitalizeFirst".
It accepts an array of strings, and capitalizes the first letter of each string

*/

function capitalizeFirst(arr) {
  let res = [];
  function helper(str) {
    str = str[0].toUpperCase() + str.slice(1);
    return res.push(str);
  }
  for (let i = 0; i < arr.length; i++) {
    helper(arr[i]);
  }
  return res;
}

console.log('capFirst: ', capitalizeFirst(['car', 'taco', 'banana'])); // expecting ["Car", "Taco", "Banana"];

console.log('\n=============================================\n');

/*

Question 6: 

Write a recursive function called "nestedEvenSum".
It accepts an object that may be nested.
Return the sum of all the even numbers no matter how nested.

*/

function nestedEvenSum(obj, sum = 0) {
  for (let item in obj) {
    if (typeof obj[item] === 'object') {
      sum += nestedEvenSum(obj[item]);
    } else if (typeof obj[item] === 'number' && obj[item] % 2 === 0) {
      sum += obj[item];
    }
  }
  return sum;
}

let myobj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANum: true,
      alsoNot: 'yup',
    },
  },
};

let myobj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' },
};

console.log('nestedEvenSum 1: ', nestedEvenSum(myobj1)); // expect 6
console.log('nestedEvenSum 2: ', nestedEvenSum(myobj2)); // expect 10

console.log('\n=============================================\n');

/*

Question 7: 

Write a recursive function called "capitalizeWords".
It accepts an array of words.
Return a new array with each word fully capitalized.

*/

function capitalizeWords(arr, allCaps = []) {
  if (arr.length === 0) return allCaps;
  allCaps.push(arr[0].toUpperCase());
  return capitalizeWords(arr.slice(1), allCaps);
}

console.log(
  'capWords: ',
  capitalizeWords(['i', 'am', 'learning', 'recursion'])
); // expect ["I", "AM", "LEARNING", "RECURSION"]

console.log('\n=============================================\n');

/*

Question 8: 

Write a recursive function called "stringifyNumbers".
It takes an object, and finds all values which are of type number, and converts them to type string.

*/

function stringifyNumbers(obj) {
  let newObj = {};
  for (let item in obj) {
    if (typeof obj[item] === 'object' && !Array.isArray(obj[item])) {
      newObj[item] = obj[item];
      newObj[item] = stringifyNumbers(obj[item]);
    } else if (typeof obj[item] === 'number') {
      newObj[item] = obj[item].toString();
    } else {
      newObj[item] = obj[item];
    }
  }
  return newObj;
}

let obj3 = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};
console.log('strNums 1: ', stringifyNumbers(obj3));
/* expect {
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/
console.log('\n=============================================\n');

/*

Question 9: 

Write a recursive function called "collectStrings".
It accepts an object, and returns an array of all the values from that object that are type string.

*/

function collectStrings(obj, strArr = []) {
  for (let item in obj) {
    if (typeof obj[item] === 'string') {
      strArr.push(obj[item]);
    } else if (typeof obj[item] === 'object') {
      collectStrings(obj[item], strArr);
    }
  }
  return strArr;
}

let obj4 = {
  stuff: 'foo',
  data: {
    val: {
      thing: {
        info: 'bar',
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: 'baz',
          },
        },
      },
    },
  },
};

console.log('collectStrings :', collectStrings(obj4)); // expect ["foo", "bar", "baz"])

console.log('\n=============================================\n');
