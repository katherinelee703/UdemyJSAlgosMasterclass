/**
 *  GRAPH TRAVERSALS:
 *
 *  Traverse - visiting/updating/checking on each vertex in a graph
 *  - for any node in some graph, there's no guarantee that there is only one unique path to get there, or even get there at all
 *  - you may revisit nodes you've already been to (will happen a lot actually)
 *    - peer to peer networking
 *    - web crawlers (like google a long time ago)
 *    - finding "closest" matches/recommendations
 *    - shortest path problems:
 *      - GPS Navigations
 *      - Solving mazes
 *      - AI (shortest path to win a game, etc.)
 *  - order for DFS may be different for recursive/iterative approaches but are still depth first
 */

class Graph {
  constructor() {
    this.adjList = {};
  }
  addVertex(name) {
    // add name and set value to empty []
    // let vertex = new Vertex(name);
    this.adjList[name]
      ? console.error('vertex already exists')
      : (this.adjList[name] = []);
    return this;
  }
  removeVertex(name) {
    // take the node off the graph
    // loops as long as there are any other edges that have it and remove each connection, otherwise get broken edges
    // call removeEdge for each vertex
    // then delete key in adjList
    if (!this.adjList[name]) return console.error('no such vertex to remove');
    while (this.adjList[name].length) {
      let connection = this.adjList[name].pop();
      this.removeEdge(name, connection);
    }
    delete this.adjList[name];
    return this;
  }
  addEdge(v1, v2) {
    // find key of v1, and push in v2
    // find key of v2, and push in v1
    // dont worry about error handling for now
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1);
    return this;
  }
  removeEdge(v1, v2) {
    // v1's array now has everything minus v2
    // v2's array now has everything minus v1
    this.adjList[v1] = this.adjList[v1].filter((v) => v !== v2);
    this.adjList[v2] = this.adjList[v2].filter((v) => v !== v1);
    return this;
  }
  dfsRecursive(vertex) {
    let results = [];
    let visited = {};
    let adjList = this.adjList; // the this context cannot be preserved in the helper function dfs, so save it here;
    (function dfs(v) {
      if (!v) return null;
      results.push(v);
      visited[v] = true;
      let neighbors = adjList[v];
      neighbors.forEach((n) => {
        if (!visited[n]) return dfs(n);
      });
    })(vertex);
    // could empty out some space here by deleting visited
    return results;
  }
  dfsIterative(vertex) {
    let results = [];
    let visited = {};
    let stack = [vertex];
    let vtx;

    while (stack.length !== 0) {
      vtx = stack.pop();
      if (!visited[vtx]) {
        results.push(vtx);
        visited[vtx] = true;
        let neighbors = this.adjList[vtx];
        neighbors.forEach((n) => {
          stack.push(n);
        });
      } // else, it has been visited, so don't do extra to it
    }
    // could empty some space here by deleting visited
    return results;
  }
  bfs(vertex) {
    let results = [];
    let visited = {};
    let q = [vertex];
    let vtx;

    while (q.length !== 0) {
      vtx = q.shift();
      if (!visited[vtx]) {
        results.push(vtx);
        visited[vtx] = true;
        let neighbors = this.adjList[vtx];
        neighbors.forEach((n) => {
          q.push(n);
        });
      }
    }
    return results;
  }
}

let g = new Graph();

console.log(g.addVertex('Tokyo'));
console.log(g.addVertex('Kyoto'));
console.log(g.addVertex('Osaka'));
console.log(g.addVertex('Nara'));
console.log(g.addVertex('Sapporo'));
console.log(g.addVertex('Kamakura'));
console.log(g.addEdge('Tokyo', 'Kyoto'));
console.log(g.addEdge('Kyoto', 'Osaka'));
console.log(g.addEdge('Osaka', 'Tokyo'));
console.log(g.addEdge('Tokyo', 'Sapporo'));
console.log(g.addEdge('Tokyo', 'Kamakura'));
console.log(g.addEdge('Tokyo', 'Nara'));
console.log(g.addEdge('Kyoto', 'Nara'));
console.log(g.addEdge('Kamakura', 'Nara'));

/**
 *                Sapporo
 *                /
 *          Tokyo --- Kamakura
 *       /    |   \    /
 *  Kyoto -- Osaka Nara
 *    |______________|
 *
 */

console.log('g dfs recursive: ', g.dfsRecursive('Tokyo'));
// expect ['Tokyo', 'Kyoto', 'Osaka', 'Nara', 'Kamakura', 'Sapporo']

console.log('g dfs iterative: ', g.dfsIterative('Tokyo'));
// expect ['Tokyo', 'Nara', 'Kamakura', 'Kyoto', 'Osaka', 'Sapporo']

console.log('g BFS: ', g.bfs('Tokyo'));
// expect ['Tokyo', 'Kyoto', 'Osaka', 'Sapporo', 'Kamakura', 'Nara']

console.log('\n================================================\n');

let test = new Graph();
test.addVertex('A');
test.addVertex('B');
test.addVertex('C');
test.addVertex('D');
test.addVertex('E');
test.addVertex('F');

/**
 *       A
 *     /   \
 *    B     C
 *    |     |
 *    D --- E
 *     \   /
 *       F
 */

test.addEdge('A', 'B');
test.addEdge('A', 'C');
test.addEdge('B', 'D');
test.addEdge('C', 'E');
test.addEdge('D', 'E');
test.addEdge('D', 'F');
test.addEdge('E', 'F');

console.log('test: ', test);
/* 
expect Graph {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B', 'E', 'F'],
  E: ['C', 'D', 'F'],
  F: ['D', 'E']
}
*/

console.log('test dfs recursive: ', test.dfsRecursive('A'));
// expect ['A', 'B', 'D', 'E', 'C', 'F']

console.log('test dfs iterative: ', test.dfsIterative('A'));
// expect ['A', 'C', 'E', 'F', 'D', 'B']

console.log('test BFS: ', test.bfs('A'));
// expect ['A', 'B', 'C', 'D', 'E', 'F']
