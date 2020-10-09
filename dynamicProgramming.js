// ABOUT DYNAMIC PROGRAMMING

/**
 *   TO USE DYNAMIC PROGRAMMING,
 *   A PROBLEM NEEDS TO MEET THESE 2 CONDITIONS:
 *    - OVERLAPPING SUBPROBLEMS
 *    - OPTIMAL SUBSTRUCTURE
 *
 *   Overlapping Subproblems:
 *    - think of fibonacci - the tree that builds it
 *      - theres lots of fib(1)s and fib(2)s at the bottom
 *        that get calculated/reached over and over
 *    - if there are repetetive portions that can be stored and
 *       used later without re-calculating,
 *       you have overlapping subproblems
 *
 *   Optimal Substructure:
 *    - has opt. substruct. if: "an optimal solution can be
 *      constructed from the optimal solutions of its subproblems"
 *    - think of shortest path problems for example:
 *      - if a shortest path from a --> e, is a -> b -> d -> e
 *        then shortest from a --> d, is a -> b -> d
 *        (the optimal subproblem can then be used to find a --> e)
 *    - however, longest path problems actually don't have this
 *      - so can't do things like find cheapest flight paths etc.
 */

// EXERCISE:
// write a function that returns the nth Fibonacci number
// (start with 1, not 0) ---> 1 1 2 3 5 8 13...

// verbose slow recursive code:
const fib = (n) => {
  if (n <= 0) throw new Error('must enter number greater than 0');
  let fibnum = 0;
  if (n === 1 || n === 2) {
    fibnum = 1;
  } else {
    fibnum = fib(n - 1) + fib(n - 2);
  }
  return fibnum;
};

console.log('\n======================================\n');
console.log('verbose slow fib of 1: ', fib(1)); // 1
console.log('verbose slow fib of 2: ', fib(2)); // 1
console.log('verbose slow fib of 3: ', fib(3)); // 2
console.log('verbose slow fib of 4: ', fib(4)); // 3
console.log('verbose slow fib of 5: ', fib(5)); // 5
console.log('verbose slow fib of 6: ', fib(6)); // 8
console.log('verbose slow fib of 7: ', fib(7)); // 13
console.log('\n======================================\n');
// console.log(fib(0)); // err
// console.log(fib(-1)); // err

// shorter syntax, but still terrible recursive code:
function concisefib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

console.log('concise slow recursive fib of 5: ', concisefib(5)); // 5
console.log('concise slow recursive fib of 6: ', concisefib(6)); // 8
console.log('concise slow recursive fib of 7: ', concisefib(7));
// 13
console.log('\n======================================\n');

// TIME COMPLEXITY OF THE ABOVE CODE:
/**
 *   Literally terrible: O(2 ^ N) - Exponential.
 *     (technically more like 1.6 ^ N, but ppl just say 2 ^ N)
 *
 *  This is because we keep repeating finding the sums
 *  look at this example:
 *
 *                       fib5
 *                     /      \
 *                fib4          fib3*
 *               /    \        /    \
 *           fib3*    fib2   fib2  fib1
 *          /    \
 *      fib2     fib1
 *
 *   we are recalculating the 3rd fib twice!
 *   it would save a lot of time if we could just remember it...
 */

// ENTER MEMOIZATION:
/**
 *   - storing the results of expensive function calls
 *     into a data structure (usually an *object or array)
 *   - return the "cached" result when same inputs occur again,
 *     instead of re-running the whole function to get it
 */

// memoized version with obj:
function memofib(n, cache = {}) {
  cache = {
    1: 1,
    2: 1,
  };

  let count = 3;
  while (count <= n) {
    cache[count] = cache[count - 1] + cache[count - 2];
    count++;
  }

  return cache[count - 1];
}

console.log('obj memo fib of 5: ', memofib(5)); // 5
console.log('obj memo fib of 6: ', memofib(6)); // 8
console.log('obj memo fib of 7: ', memofib(7)); // 13
console.log('\n======================================\n');

// memoized version with arr:
function memo2fib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  let result = memo2fib(n - 1) + memo2fib(n - 2);
  memo[n] = result;
  return result;
}

console.log('arr memo fib of 1: ', memo2fib(1)); // 1
console.log('arr memo fib of 5: ', memo2fib(5)); // 5
console.log('arr memo fib of 6: ', memo2fib(6)); // 8
console.log('arr memo fib of 7: ', memo2fib(7)); // 13
console.log('\n======================================\n');

// MEMOIZED TIME COMPLEXITY:
/**
 *  We went from TC of O(2 ^ N), almost the worst
 *  to O(N), almost the best.
 *  with very few code edits, a huge improvement can be made!!
 *
 *  BUT, MEMOIZATION IS JUST *1* FLAVOR OF DYNAMIC PROGRAMMING
 *  Memoization can be described as a more "top down" approach
 *
 *
 *  THERE IS ALSO A "bottom up" TABULATION APPROACH:
 *   - usually done using iteration
 *   - results store in some sort of table (usually array or obj)
 *     (hence calling it "tabulation")
 *   - can achieve a BETTER SPACE COMPLEXITY
 *     (because not filling call stack with recursive calls)
 *
 *  Considering now the the memoized version seemed better,
 *  it can still break when we want to calculate a really
 *  large nth fibonacci number (like 10000)
 *   - it will max out call stack
 *
 *  but we can avoid this (kinda) by avoiding recursion & using
 *  tabulation method via iteration (no huge call stack)
 *  * note: for really large number JavaScript will get mad
 *          and just give you Infinity, but other languages will
 *          give you the real number, even if it's huge
 *
 *  TABULATION TIME COMPLEXITY IS STILL O(N): LINEAR
 *  IT'S ONLY SPACE COMPLEXITY THAT GETS BETTER: O(1) CONSTANT *?*
 */

// tabulation bottom up version:
function tablefib(n) {
  if (n <= 2) return 1;
  let fibnums = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    fibnums[i] = fibnums[i - 1] + fibnums[i - 2];
  }
  return fibnums[n];
}

console.log('table fib of 2: ', tablefib(2)); // 1
console.log('table fib of 5: ', tablefib(5)); // 5
console.log('table fib of 1k: ', tablefib(1000)); // 4.3466...e+28
console.log('table fib of 10k: ', tablefib(10000)); // Infinity

/*
 *  Considering now the the memoized version seemed better than
 *  regular recursive way, it can still break when we want to
 *  calculate a really large nth fibonacci number (like 10000)
 *   - it will max out call stack
 *
 *  but we can avoid this (kinda) by avoiding recursion & using
 *  tabulation method via iteration (no huge call stack at least)
 *  * note: for really large number JavaScript will get mad
 *          and just give you Infinity, but other languages will
 *          give you the real number, even if it's huge
 *
 *  TABULATION TIME COMPLEXITY IS STILL O(N): LINEAR
 *  IT'S ONLY SPACE COMPLEXITY THAT GETS BETTER: O(1) CONSTANT *?*
 */
