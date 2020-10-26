import { animateAlgorithm, sortNodesByDistance, getAllNodes, getUnvisitedNeighbors, getNodesInShortestPathOrder } from './helpers.js';

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
      if(closestNode.type === "wallNode") continue;
      // Return if there are no possible routes
      if (closestNode.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      // Check if the current node is the finish node
      if(closestNode === finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid);
  }
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

export function visualizeDijkstra(grid, startNodeCoords, finishNodeCoords) {
  const visitedNodesInOrder = computeDijkstra(grid, startNodeCoords, finishNodeCoords);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
}


