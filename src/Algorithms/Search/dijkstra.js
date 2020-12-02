import { animateAlgorithm, sortNodesByDistance, getAllNodes, getUnvisitedNeighbors, getNodesInShortestPathOrder, clearPath } from '../helpers.js';

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
    neighbor.distance = node.distance + neighbor.weight;
    neighbor.previousNode = node;
  }
}

export function visualizeDijkstra(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
  algoVisualizer.setState({running: true});
  clearPath(algoVisualizer);
  var startTime = new Date().getTime();
  const visitedNodesInOrder = computeDijkstra(grid, startNodeCoords, finishNodeCoords);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
  var runTimeSeconds = new Date().getTime() - startTime;
  animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder);
  algoVisualizer.setState({ isPathDrawn: true, runTimeSeconds, lastAlgoRunString: "Dijkstra" });
}


