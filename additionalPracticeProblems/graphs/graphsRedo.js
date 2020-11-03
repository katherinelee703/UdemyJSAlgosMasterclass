// redoing graphs activities

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this.adjacencyList;
  }
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2])
      return null;
    let v1edges = this.adjacencyList[vertex1].slice();
    let v2edges = this.adjacencyList[vertex2].slice();

    while (v1edges.length) {
      if (v1edges[v1edges.length - 1] !== vertex2) {
        v1edges.pop();
      }
      if (v1edges.length === 1 && v1edges[0] === vertex2) {
        break;
      }
    }
    if (v1edges.length === 0) {
      this.adjacencyList[vertex1].push(vertex2);
    }

    while (v2edges.length) {
      if (v2edges[v2edges.length - 1] !== vertex2) {
        v2edges.pop();
      }
      if (v2edges.length === 1 && v2edges[0] === vertex1) {
        break;
      }
    }
    if (v2edges.length === 0) {
      this.adjacencyList[vertex2].push(vertex1);
    }

    return this.adjacencyList;
  }
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (val) => val !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (val) => val !== vertex1
    );
    return this.adjacencyList;
  }
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return null;
    let edges = this.adjacencyList[vertex];
    edges.forEach((edge) => this.removeEdge(edge, vertex));

    delete this.adjacencyList[vertex];
    return this.adjacencyList;
  }
  dfs(vertex) {
    let order = [];
    let stack = [vertex];
    let visited = {};
    let popped;

    while (stack.length) {
      popped = stack.pop();
      if (!visited[popped]) {
        order.push(popped);
        visited[popped] = 1;
        stack.push(...this.adjacencyList[popped]);
      }
      // else we have visited that item, so just popping off is enough, continue on;
    }
    return order;
  }
  bfs(vertex) {
    let order = [];
    let q = [vertex];
    let visited = {};
    let out;

    while (q.length) {
      out = q.shift();
      if (!visited[out]) {
        order.push(out);
        visited[out] = 1;
        q.push(...this.adjacencyList[out]);
      }
      // else we have already visited that item, so just taking off front of line is enough
    }
    return order;
  }
}

let g = new Graph();
g.addVertex('S');
g.addVertex('P');
g.addVertex('U');
g.addVertex('X');
g.addVertex('Q');
g.addVertex('Y');
g.addVertex('V');
g.addVertex('R');
g.addVertex('W');
g.addVertex('T');

g.addEdge('S', 'P');
g.addEdge('S', 'U');

g.addEdge('P', 'X');
g.addEdge('U', 'X');

g.addEdge('P', 'Q');
g.addEdge('U', 'V');

g.addEdge('X', 'Q');
g.addEdge('X', 'Y');
g.addEdge('X', 'V');

g.addEdge('Q', 'R');
g.addEdge('Y', 'R');

g.addEdge('Y', 'W');
g.addEdge('V', 'W');

g.addEdge('R', 'T');
g.addEdge('W', 'T');

console.log(g);
console.log('DFS: ', g.dfs('S'));
console.log('BFS: ', g.bfs('S'));

// let g = new Graph();
// g.addVertex("hello");
// g.addVertex("goodbye");
// g.addVertex("hmm");

// g.addEdge("hello", "goodbye");
// g.addEdge("hello", "hmm");
// g.addEdge("goodbye", "hmm");

// g.addEdge("hello", "whee"); // null

// g.addEdge("goodbye", "hello"); // makes no changes bc already a connection
// console.log(g)
// g.dfs("goodbye"); // yay it works!

//console.log(g.removeEdge("hmm", "hello"));

/*
{
  hello: [ 'goodbye', 'hmm' ],
  goodbye: [ 'hello', 'hmm' ],
  hmm: [ 'hello', 'goodbye' ]
}

{
  hello: [ 'goodbye' ],
  goodbye: [ 'hello', 'hmm' ],
  hmm: [ 'goodbye' ]
}
*/

//console.log(g.removeVertex("hello"));

/*

{
  hello: [ 'goodbye' ],
  goodbye: [ 'hello', 'hmm' ],
  hmm: [ 'goodbye' ]
}

{ 
  goodbye: [ 'hmm' ], 
  hmm: [ 'goodbye' ] 
}

*/

//console.log(g.removeVertex("hmm"));

/*

{ 
  goodbye: [ 'hmm' ], 
  hmm: [ 'goodbye' ] 
}

{ goodbye: [] }

*/

// console.log(g.removeVertex("goodbye")); // {}

// console.log(g.removeVertex("woot")); // null
