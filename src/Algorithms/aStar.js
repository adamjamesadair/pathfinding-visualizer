import AlgoVisualizer from '../AlgoVisualizer/AlgoVisualizer.jsx';
import { animateAlgorithm, sortNodesByDistance, getAllNodes, getUnvisitedNeighbors, getNodesInShortestPathOrder, clearPath } from './helpers.js';

export function computeAStar(grid, startNodeCoords, finishNodeCoords) {
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
        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

export function visualizeAStar(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
  clearPath(algoVisualizer);
  const visitedNodesInOrder = computeAStar(grid, startNodeCoords, finishNodeCoords);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // Manhattan distance heuristic
    var manhattanDistance = Math.abs(neighbor.row - finishNode.row) + Math.abs(neighbor.col - finishNode.col);
    neighbor.distance = manhattanDistance;
    neighbor.previousNode = node;
  }
}