// ABOUT BINARY HEAPS

/**
 * 
 */

class MaxBinaryHeap {
  constructor() {
    this.values = [41,39,33,18,27,12]; // easy way for simpler test
  }
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this.values; // or this;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let el = this.values[idx];
    while(idx > 0) {
      let parentIdx = Math.floor((idx - 1)/2);
      let par = this.values[parentIdx];
      if (el <= par) break;
      this.values[parentIdx] = el;
      this.values[idx] = par;
      idx = parentIdx;
    }
    return;
  }
  extractMax() {
    let newMax = this.values.pop();
    let oldMax = this.values[0];
    this.values[0] = newMax;
    let idx = 0
    
    while(true) {
      let left = this.values[idx * 2 + 1];
      let leftIdx = idx * 2 + 1;
      let right = this.values[idx * 2 + 2];
      let leftIdx = idx * 2 + 2;
      let larger = 
       
      if (larger > this.values[idx]) {
        [this.values[idx], larger] = [larger, this.values[idx]]
        idx = 
      }
      
    }



    return oldMax;
  }
}

let maxheap = new MaxBinaryHeap();

console.log("original maxheap: ", maxheap.values);
/**
 *             41
 *            /  \
 *          39    33
 *         /  \  /  
 *        18  27 12
*/

console.log("insert 55: ", maxheap.insert(55)); 
// [55,39,41,18,27,12,33]

/**
 *             41
 *            /  \
 *          39    33
 *         /  \  /  \
 *        18  27 12 55
*/
/**
 *             41
 *            /  \
 *          39    55
 *         /  \  /  \
 *        18  27 12 33
*/
/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 */

console.log("insert 1: ", maxheap.insert(1)); 
// [55,39,41,18,27,12,33,1]

/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 *       /
 *      1
*/       
console.log("insert 45: ", maxheap.insert(45)); 
// [55,45,41,39,27,12,33,1,18]

/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        18  27 12 33
 *       /  \
 *      1   45
*/ 
/**
 *             55
 *            /  \
 *          39    41
 *         /  \  /  \
 *        45  27 12 33
 *       /  \
 *      1   18
*/   
/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39  27 12 33
 *       /  \
 *      1   18
*/    
console.log("insert 100: ", maxheap.insert(100)); 
// [100,55,41,39,45,12,33,1,18,27]

/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39  27 12 33
 *       / \  /
 *      1  18 100
*/    
/**
 *             55
 *            /  \
 *          45    41
 *         /  \  /  \
 *        39 100 12 33
 *       / \  /
 *      1  18 27
*/ 
/**
 *             55
 *            /  \
 *         100    41
 *         /  \  /  \
 *        39  45 12 33
 *       / \  /
 *      1  18 27
*/ 
/**
 *            100
 *            /  \
 *          55    41
 *         /  \  /  \
 *        39  45 12 33
 *       / \  /
 *      1  18 27
*/ 

console.log("extract max 100: ", maxheap.extractMax());
console.log(maxheap.values);