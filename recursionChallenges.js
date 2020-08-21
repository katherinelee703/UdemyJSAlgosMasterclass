/*

Question 1: 

Write a function called "power".
It takes in a base (number...) and an exponent (to the power of...).
The function should return the power of the base to the exponent.
Do not worry about negative bases.

*/

function power(num, exp) {
  if (exp === 0) return 1;
  return num * power(num, exp - 1);
}

console.log('power 2 to 0: ', power(2, 0)); // expect 1
console.log('power 2 to 2: ', power(2, 2)); // expect 4
console.log('power 2 to 4: ', power(2, 4)); // expect 16

console.log('\n==============================================\n');

/*

Question 2: 

Write a function called "factorial".
It takes in a number and returns the factorial result of it. 
Ex: 4! = 4 * 3 * 2 * 1
Factorial of 0 is always 1

*/

function factorial(num) {
  if (num < 0) return num * factorial(num + 1);
  if (num === 0) return 1;
  return num * factorial(num - 1);
}

console.log('factorial 1: ', factorial(1)); // expect 1
console.log('factorial 2: ', factorial(2)); // expect 2
console.log('factorial 4: ', factorial(4)); // expect 24
console.log('factorial 7: ', factorial(7)); // expect 5040
console.log('factorial 0: ', factorial(0)); // expect 1
console.log('factorial -3: ', factorial(-3)); // expect -6

console.log('\n==============================================\n');

/*

Question 3: 

Write a function called "productOfArray".
It takes in an array of numbers and returns the product of all of them.

*/

function productOfArray(arr) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0] * 1;
  return arr[0] * productOfArray(arr.slice(1));
}

console.log('productOfArray: ', productOfArray([1, 2, 3])); // expect 6
console.log('productOfArray: ', productOfArray([1, 2, 3, 10])); // expect 60
console.log('productOfArray: ', productOfArray([0])); // expect 0
console.log('productOfArray: ', productOfArray([])); // expect null

console.log('\n==============================================\n');

/*

Question 4: 

Write a function called "recursiveRange".
It takes in a number and adds up all the numbers before it starting from 0, up to the given number.

*/

function recursiveRange(num) {
  if (num === 1) return num; // also works with if (num === 0) return 0 || num;
  return num + recursiveRange(num - 1);
}

console.log('recursiveRange 6: ', recursiveRange(6)); // expect 21
console.log('recursiveRange 10: ', recursiveRange(10)); // expect 55

console.log('\n==============================================\n');

/*

Question 5: 

Write a function called "fib" for fibonacci.
It takes in a number, n, and returns the nth fibonacci number in the sequence.
Recall it starts with 1 + 1;
1, 1, 2, 3, 5, 8, 13, etc.
Every next num is the sum of the previous 2 nums.

*/

function fib(n) {
  if (n <= 0) return 'ERROR: number cannot be negative or 0';
  if (n === 2 || n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}

console.log('fib of 4: ', fib(4)); // expect 3
console.log('fib of 10: ', fib(10)); // expect 55
console.log('fib of 28: ', fib(28)); // expect 317811
console.log('fib of 35: ', fib(35)); // expect 9227465
console.log('fib of -3: ', fib(-3)); // expect error

console.log('\n==============================================\n');
