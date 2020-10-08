// ABOUT DIJKSTRA'S ALGORITHM

/**
 * Dijkstra's "Shortest Path" Algorithm
 * It acts/searches upon a weighted graph
 * Finds fastest way from point A to point B
 * Naive: uses a priority queue in its implementation
 *   (not building from scratch, copying over)
 * Better: uses a binary heap in its implementation
 *   (not building from scratch, copying over)
 */

/* UTILIZE A PRIORITY QUEUE FOR NAIVE APPROACH
the goal with this is to sort every time we enqueue something, 
so that any time we dequeue something out, 
the smallest item is the one removed from the queue.

utilizing this approach to dijkstra's will give a time complexity:
O(N * log(N))
The method is simple to understand, but the time isn't ideal.
The time can be improved w/binary heaps, in 2nd example.
*/

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue(val) {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

// WRITING A WEIGHTED GRAPH FIRST:

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

// console.log("A:", g.adjList["A"]);
// console.log("B:", g.adjList["B"]);
// console.log("C:", g.adjList["C"]);
// console.log("D:", g.adjList["D"]);
// console.log("E:", g.adjList["E"]);
// console.log("F:", g.adjList["F"]);

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
