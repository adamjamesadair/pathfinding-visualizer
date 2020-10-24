export function computeDijkstra(grid, startNodeCoords, finishNodeCoords) {
  const startNode = grid[startNodeCoords[0]][startNodeCoords[1]];
  const finishNode = grid[finishNodeCoords[0]][finishNodeCoords[1]];
  startNode.distance = 0;
  var visitedNodes = [];
  const unvisitedNodes = getAllNodes(grid);

  while(unvisitedNodes.length){
      // Sort the nodes by distance
      sortNodesByDistance(unvisitedNodes);
      // Get the closest unvisited node
      var closestNode = unvisitedNodes.shift();
      // unvisitedNodes.unshift();
      // Skip if the closest node is a wall
      if(closestNode.type == "wallNode") continue;
      // Return if there are no possible routes
      if (closestNode.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      // Check if the current node is the finish node
      if(closestNode == finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {row, col} = node;

    if(row > 0) neighbors.push(grid[row-1][col]);
    if(row + 1 < grid.length) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col + 1 < grid[0].length) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodesByDistance(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  var currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}