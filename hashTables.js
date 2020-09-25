/**
 *   ABOUT HASH TABLES - aka HASH MAPS:
 *
 *     What is a hash table:
 *        - used to store key-value pairs
 *        - like arrays, but the keys are NOT ordered
 *        - unlike arrays, hash tables are FAST for:
 *          - finding values
 *          - adding new values
 *          - removing values
 *            - (all 3 of these should be O(1) constant time!)
 *        * - should deal with collisions
 *        * - bonus: should prevent inputting of same key name more than once
 */

// WHAT IS A HASING ALGORITHM? :
// simple hash func that works on strings only

function hash1(key, arrLength) {
  let total = 0;
  for (let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrLength;
  }
  return total;
}

hash1('pink', 10); // 0
hash1('yellow', 10); // 2
hash1('cyan', 10); // 3
hash1('maroon', 10); // 6

// uh oh, collision!
hash1('blue', 10); // 0

// WHAT MAKES A GOOD HASHING FUNCTION? :
// it should have as few collisions as possible
// evenly distribute data in a random way
// deal with collisions in a consisten manner

// PROBLEMS WITH HASH1 :
// it ONLY works with strings
// not constant time, it's linear time - ie depends on the length of key string
// not very random - data could become clustered too easily

// IDEAS TO IMPROVE HASH1 :
// utilize PRIME NUMBERS to make more random - FUN FACT: almost all hash functions utlizie prime numbers to reduce collisions
// prime numbers are espcially helpful if the array you store into has a prime length

function hash2(key, arrLength) {
  let total = 0;
  let WEIRD_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * WEIRD_PRIME + value) % arrLength;
  }
  return total;
}

hash2('pink', 13); // 5
hash2('yellow', 13); // 0
hash2('blue', 13); // 10
hash2('maroon', 13); // 11
hash2('purple', 13); // 8

// // uh oh, collision, but happens later!
hash2('cyan', 13); // 5

// NOTE :
// for small prime numbers like these the collisions will still happen somewhat often,
// but the larger the prime number length, the more significantly you can reduce the number of collisions.
// just go with that, don't need to worry about why mathematically.

// DEALING WITH COLLISIONS :

// OPTION 1 :
// LINEAR PROBING:
// when there's a collision, we only store 1 piece of data,
// and search thru the rest of the array to find the closest remaining empty slot

// OPTION 2 :
// SEPARATE CHAINING:
// storing the collided items at the same spot, but using a nested data structure
// this allows us to store multiple key values pairs at the same position
// NICE POINT: you can store more things than the specified length (reduces limitation)
// will use separate chaining in the examples for this section

class HashTable {
  constructor(size = 3) {
    // actually make 53 default the size - prime num should be bigger if possible! 3 was for easy logging
    this.keyMap = new Array(size); // makes a new array of specified length!
  }
  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }
  // set(key,val) {  // MY ORIGINAL SET
  //   // hash, figure out where to store, store nested
  //   let hashedLocation = this._hash(key);
  //   if (this.keyMap[hashedLocation]) {
  //     this.keyMap[hashedLocation] = [this.keyMap[hashedLocation]]
  //     this.keyMap[hashedLocation].push([key, val])
  //   } else {
  //     this.keyMap[hashedLocation] = [key, val];
  //   }
  //   return this;
  // }
  set(key, val) {
    let idx = this._hash(key);
    // could add additional logic here to prevent someone from inserting the same key name more than once regardless of value
    for (let i = 0; i < this.keyMap.length; i++) {
      if (!this.keyMap[i]) {
        continue;
      } else {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (this.keyMap[i][j][0] === key)
            return console.log(
              'ERROR: key name already taken, please use new key name'
            );
        }
      }
    }

    if (!this.keyMap[idx]) {
      this.keyMap[idx] = [];
    }
    this.keyMap[idx].push([key, val]);
    return this;
  }
  // get(key) {   // MY ORIGINAL GET
  //   // hashes key, go to position at that index, if multiple loop thru till find matching key at arr[0], if no key return undef
  //   let idx = this._hash(key);
  //   let keyMapLocation = this.keyMap[idx];
  //   if (keyMapLocation === undefined) return undefined;
  //   if (Array.isArray(keyMapLocation[0])) {
  //     for (let i = 0; i < keyMapLocation.length; i++) {
  //       let item = keyMapLocation[i];
  //       if (item[0] === key) return item;
  //     }
  //     return undefined;
  //   }
  //   return keyMapLocation;
  // }
  get(key) {
    let idx = this._hash(key);
    let location = this.keyMap[idx];
    if (location) {
      // it is filled, we wanna check all items in that array, incase there is more than 1.
      // if only 1 item its still ok bc it will only run once
      for (let i = 0; i < location.length; i++) {
        if (location[i][0] === key) return location[i][1]; // [1] gets the val. you could return key and val if you want.
      }
    }
    return undefined;
  }
  keys() {
    // returns a list of all the unique keys (but keys should be unique anyway so it should return them all)
    let uniqueKeys = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          //if(!uniqueKeys.includes(this.keyMap[i][j][0])) { // can delete this line if prevent multiple of same key name in set
          uniqueKeys.push(this.keyMap[i][j][0]);
          //}
        }
      }
    }
    return uniqueKeys;
  }
  values() {
    // returns a list of all the unique values (values are more likely to have repeats)
    let uniqueVals = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!uniqueVals.includes(this.keyMap[i][j][1])) {
            uniqueVals.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return uniqueVals;
  }
}

let hash3 = new HashTable();

console.log('hash3: ', hash3);
console.log('hash3.keyMap: ', hash3.keyMap);
console.log('hash3.keyMap.length: ', hash3.keyMap.length);
console.log('set pink: ', hash3.set('pink', '#pretty in'));
console.log('set blue: ', hash3.set('blue', '#feeling'));
console.log('set cyan: ', hash3.set('cyan', "#printer's blue"));
console.log('keyMap[1]: ', hash3.keyMap[1]);
console.log('get blue: ', hash3.get('blue'));
console.log('get pink: ', hash3.get('pink'));
console.log('get purple: ', hash3.get('purple'));
console.log('get cyan: ', hash3.get('cyan'));
console.log('set purple: ', hash3.set('purple', '#deep'));
console.log('get purple: ', hash3.get('purple'));
console.log('keyMap[1] again w/3 items: ', hash3.keyMap[1]);
console.log(hash3.get('blah'));
// make some duplicate values;
hash3.set('pinku', '#pretty in');
hash3.set('pinky', '#pretty in');
console.log('values: ', hash3.values());
console.log('keys: ', hash3.keys());
hash3.set('pink', '#pretty in');
hash3.set('purple', 'puprle');

/**
 *   BIG O COMPLEXITIES:
 *
 *   ON AVG & BEST CASE:
 *     Insertion: O(1) constant - IF you write a good hash function
 *     Deletion: O(1) constant
 *     Access: O(1) constant
 *
 *     However, the world's WORST hash function (distributes extremely unevenly) would be O(N) time.
 *
 *   Recommendation: generally don't need to write you own hash functions. find a decent one online.
 *
 *   Big O of cryptographich hash functions will go by different rules and have different complexities.
 *   But just general hash functions like above will follow the above trend
 */
