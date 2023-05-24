// DATA
const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');

const routes = [
  ['PHX', 'LAX'],
  ['PHX', 'JFK'],
  ['JFK', 'OKC'],
  ['JFK', 'HEL'],
  ['JFK', 'LOS'],
  ['MEX', 'LAX'],
  ['MEX', 'BKK'],
  ['MEX', 'LIM'],
  ['MEX', 'EZE'],
  ['LIM', 'BKK'],
];

// The graph
const adjacencyList = new Map();

// Add node
function addNode(airport: string) {
  adjacencyList.set(airport, []);
}

// Add edge, undirected
function addEdge(origin: string, destination: string) {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
}

// Create the Graph
airports.forEach(addNode);
routes.forEach((route) => addEdge(route[0], route[1]));

console.log('adjacencyList', adjacencyList);

// DFS Depth First Search
function dfs<T>(from: T, to: T, visited = new Set<T>()) {
  const destinations = adjacencyList.get(from);
  visited.add(from);
  console.log(from);

  for (const destination of destinations) {
    if (destination === to) {
      console.log(`${to} Route from ${from} to ${to} found`);
      return;
    }

    if (!visited.has(destination)) {
      dfs(destination, to, visited);
    }
  }

  // console.log('destinations', destinations);
}

dfs('PHX', 'BKK');
