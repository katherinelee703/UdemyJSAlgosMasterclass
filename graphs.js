/**
 *  ABOUT GRAPHS
 *
 *  What is a graph?
 *    - a collection of nodes and connections
 *      - node/nodes are also called vertex/vertices
 *      - connections are call edges
 *      - all nodes a treated equally
 *      - can start w/any node
 *    * - connections can be directed(arrows) or un-directed(lines)
 *    * - also weighted(info about connection itself) or un-weighted(all connections are valued equally)
 *
 *  Compare different graphs and their use cases:
 *    - social networks
 *    - location/mapping
 *       - finding shortest/most efficient path, etc
 *    - routing algorithms
 *    - visual hierarchy
 *    - file system optimizations
 *    - recommendations
 *       - "people also watched..."
 *       - "you might also like..."
 *       - "people you might know..."
 *       - "frequently bought with..."
 *    - basically everywhere!
 *
 *  Adjacency Matrix:
 *    - storing a graph as a nested array, or something with rows and columns
 *    - any row and column that shares a connection would get a 1
 *    - any row and column that doesn't share a connection would get a 0 for example
 *
 *             |A|--|B|
 *            /        \
 *          |F|        |C|
 *            \        /
 *             |E|--|D|
 *
 *      |A|B|C|D|E|F|
 *    |A|0|1|0|0|0|1|
 *    |B|1|0|1|0|0|0|
 *    |C|0|1|0|1|0|0|
 *    |D|0|0|1|0|1|0|
 *    |E|0|0|0|1|0|1|
 *    |F|1|0|0|0|1|0|
 *
 *  Adjacency List:
 *
 *             |0|--|1|
 *            /        \
 *          |5|        |2|
 *            \        /
 *             |4|--|3|
 *
 *   Using an array could work if the nodes are numbers and all numbers from 0 to end are filled, but that wont always happen
 *       [
 *     O   [1,5],
 *     1   [0,2],
 *     2   [1,3],
 *     3   [2,4],
 *     4   [3,5],
 *     5   [4,0],
 *       ]
 *                   0 is connected to both 1 and 5
 *                   1 is connected to both 0 and 2 etc...
 *
 *   Using a hash table is a better option, especially if your nodes/vertices are strings, not nums
 *   {
 *     A: ["B", "F"],
 *     B: ["A", "C"],
 *     C: ["B", "A"],
 *     D: ["C", "E"],
 *     E: ["D", "F"],
 *     F: ["E", "A"]
 *   }
 *
 *   BIG O of ADJ MATRIX vs ADJ LIST:
 *
 *   -----------------------------------------------------
 *   |   OPERATION   | ADJACENCY LIST | ADJACENCY MATRIX |
 *   |---------------------------------------------------|
 *   | add vertex    | O(1)           | O(|V^2|)         |
 *   | add edge      | O(1)           | O(1)             |
 *   | remove vertex | O(|V| + |E|)   | O(|V^2|)         |
 *   | remove edge   | O(|E|)         | O(1)             |
 *   | query         | O(|V| + |E|)   | O(1)             |
 *   | storage       | O(|V| + |E|)   | O(|V^2|)         |
 *   -----------------------------------------------------
 *
 *                     ADJ LIST:                      |                 ADJ MATRIX:
 *     (o) can take up less space (in sparse graphs)  |  (x) takes up more space (in sparse graphs)
 *     (o)    faster to iterate over all edges        |  (x) slower to iterate over all edges
 *     (x)  can be slower to lookup specific edge     |  (o) faster to lookup specific edge
 *
 *  Implement a graph with an ADJACENCY LIST:
 *    - Why will we use adj list?
 *      - bc in the real world, data tends to end up making sparser and/or larger graphs
 *        - not everything is connected to everything else
 */

class Graph {
  constructor() {
    this.adjList = {};
  }
  addVertex(name) {
    // add name and set value to empty []
    //let vertex = new Vertex(name);
    this.adjList[name]
      ? console.error('vertex already exists')
      : (this.adjList[name] = []);
    return this;
  }
  removeVertex(name) {
    // take the node off the graph
    // loops as long as there are any other edges that have it and remove each connection, otherwise get broken edges
    // call removeEdge for each vertex
    // then delete key in adjlist
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
    // dont worry about error handling
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1);
    return this;
  }
  removeEdge(v1, v2) {
    // v1's array has everything minus v2
    // v2's array has everything minus v1
    this.adjList[v1] = this.adjList[v1].filter((v) => v !== v2);
    this.adjList[v2] = this.adjList[v2].filter((v) => v !== v1);
    return this;
  }
}

let g = new Graph();
console.log(g.addVertex('Tokyo'));
console.log(g.addVertex('Kyoto'));
console.log(g.addVertex('Osaka'));
console.log(g.addEdge('Tokyo', 'Kyoto'));
console.log(g.addEdge('Kyoto', 'Osaka'));
console.log(g.addEdge('Osaka', 'Tokyo'));
// console.log(g.removeEdge("Osaka", "Kyoto"));
// console.log(g.removeEdge("Osaka", "Tokyo"));
console.log(g.removeVertex('Osaka'));
//console.log(g.removeVertex("Kyoto"));
console.log(g.removeVertex('Nara'));

/*
 *  In next section:
 *   - Traverse a graph w/BFS and DFS
 *   - Compare and contrast graph traversal algorithms
 */
