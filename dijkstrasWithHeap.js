// DIJKSTRA'S ALGORITHM - UPGRADED PRIORITY QUEUE TO USE HEAP
// Time Complexity goes down from O(Nlog(N)) to O(log(N))

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, p) {
    // insert into heap
    // makes new node, puts in right spot based on priorty, not based on val
    let newNode = new Node(val, p);
    this.values.push(newNode);
    this.bubbleUp();
    return this.values;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return;
  }
  dequeue() {
    // extract min
    // removes root element, returns it, rearranged heap using priority, not val
    const oldMin = this.values[0];
    let newMin = this.values.pop();
    if (this.values.length === 0) return newMin;
    this.values[0] = newMin;
    this.sinkDown();
    return oldMin;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = idx * 2 + 1;
      let rightChildIdx = idx * 2 + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
        // *** //  here you could also check insert time in the case that items have the same priority,
        // *** //  and select the oldest to be dequeued first, then sort
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class Node {
  constructor(val, p) {
    this.val = val;
    this.priority = p;
    // *** // could add this.insertTime = new Date.now() to track the order of things being inserted
  }
}

class WeightedGraph {
  constructor() {
    this.adjList = {};
  }
  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }
  addEdge(v1, v2, weight) {
    this.adjList[v1].push({ node: v2, weight });
    this.adjList[v2].push({ node: v1, weight });
  }
  dijkstra(start, end) {
    let pq = new PriorityQueue();
    let distances = {};
    let previous = {};
    let shortestPath = [];
    let smallest;

    // build up initial state:
    for (let v in this.adjList) {
      if (v === start) {
        distances[v] = 0;
        pq.enqueue(v, 0);
      } else {
        distances[v] = Infinity;
        pq.enqueue(v, Infinity);
      }
      previous[v] = null;
    }

    // while we have something in the queue:
    while (pq.values.length) {
      smallest = pq.dequeue().val;
      if (smallest === end) {
        // WE ARE DONE!
        // BUILD OUT PATH AND RETURN IT
        while (previous[smallest]) {
          shortestPath.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjList[smallest]) {
          // find neighboring node
          let neighborNode = this.adjList[smallest][neighbor];
          // calculate new distance from start to neighbor
          let candidate = distances[smallest] + neighborNode.weight;
          let nextNeighbor = neighborNode.node;
          if (candidate < distances[nextNeighbor]) {
            // updating new shortest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous - ie how we got to here
            previous[nextNeighbor] = smallest;
            // enqueue in pq with updated priority
            pq.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    let path = shortestPath.concat(smallest).reverse();
    // console.log("distances: ", distances);
    // console.log("previous: ", previous);
    // console.log("pq: ", pq);
    // console.log("path: ", path);
    return `shortest path: [${path}] --> total distance: ${distances[end]}`;
  }
}

let g = new WeightedGraph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 4);
g.addEdge('D', 'E', 3);
g.addEdge('D', 'F', 1);
g.addEdge('E', 'F', 1);

/***
 *
 *              4
 *        |A| ----- |B|
 *     2 /  2       3  \ 3
 *     |C| --- |D| --- |E|
 *       \      | 1    /
 *      4 \_____|_____/ 1
 *             |F|
 *
 */

console.log("Dijkstra's Algorithm: ", g.dijkstra('A', 'E'));

/** Indeed the shortest path was:
 *
 *
 *        |A|
 *     2 /
 *     |C| --- |D|     |E|
 *          2   | 1    /      total distance: 2+2+1+1 = 6
 *              |_____/ 1
 *             |F|
 *
 */
