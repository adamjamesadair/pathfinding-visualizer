import { animateAlgorithm, sortNodesByDistanceAndHeuristic, getAllNodes, getUnvisitedNeighbors, getNodesInShortestPathOrder, clearPath, getEuclideanDistance } from '../helpers.js';

export function computeAStar(grid, startNodeCoords, finishNodeCoords) {
    const startNode = grid[startNodeCoords[0]][startNodeCoords[1]];
    const finishNode = grid[finishNodeCoords[0]][finishNodeCoords[1]];
    grid = getGridWithHeuristics(grid, finishNode, "manhattan");
    startNode.distance = 0;
    var visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);

    while(unvisitedNodes.length){
        // Sort the nodes by distance
        sortNodesByDistanceAndHeuristic(unvisitedNodes);
        // Get the closest unvisited node
        var closestNode = unvisitedNodes.shift();
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

export function visualizeAStar(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    algoVisualizer.setState({running: true});
    clearPath(algoVisualizer);
    const visitedNodesInOrder = computeAStar(grid, startNodeCoords, finishNodeCoords);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
    animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    const weight = 1;
    for (const neighbor of unvisitedNeighbors) {
        if(node.distance === 0){
            neighbor.distance = weight + neighbor.heuristic; 
        } else {
            neighbor.distance = node.distance - node.heuristic + weight + neighbor.heuristic;
        }
        neighbor.previousNode = node;
    }
}

function getGridWithHeuristics(grid, finishNode, heuristic="manhattan"){
    for (const row of grid) {
        for (const node of row) {
            if(heuristic === "manhattan"){
                // Manhattan distance heuristic
                node.heuristic = Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
            } else if(heuristic === "euclidean") {
                // Euclidean distance 
                node.heuristic = getEuclideanDistance(node.row, node.col, finishNode.row, finishNode.col);
            }
        }
    }
    return grid;
}