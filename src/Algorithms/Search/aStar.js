import { animateAlgorithm, sortNodesByDistance, getAllNodes, getUnvisitedNeighbors, getNodesInShortestPathOrder, clearPath, getEuclideanDistance } from '../helpers.js';

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
        // Skip if the closest node is a wall
        if(closestNode.type === "wallNode") continue;
        // Return if there are no possible routes
        if (closestNode.distance === Infinity) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        // Check if the current node is the finish node
        if(closestNode === finishNode) return visitedNodes;
        updateUnvisitedNeighbors(closestNode, grid, finishNode, "manhattan");
    }
}

export function visualizeAStar(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    algoVisualizer.setState({running: true});
    clearPath(algoVisualizer);
    const visitedNodesInOrder = computeAStar(grid, startNodeCoords, finishNodeCoords);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
    animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder);
}

function updateUnvisitedNeighbors(node, grid, finishNode, heuristic="manhattan") {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if(heuristic === "manhattan"){
            // Manhattan distance heuristic
            var neighborDistance = Math.abs(neighbor.row - finishNode.row) + Math.abs(neighbor.col - finishNode.col);
            var nodeDistance = Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
        } else if(heuristic === "euclidean") {
            // Euclidean distance 
            var neighborDistance = getEuclideanDistance(neighbor.row, neighbor.col, finishNode.row, finishNode.col);
            var nodeDistance = getEuclideanDistance(node.row, node.col, finishNode.row, finishNode.col);
        }
        
        if(node.distance === 0){
            neighbor.distance = 1 + neighborDistance; 
        } else {
            neighbor.distance = node.distance - nodeDistance + 1 + neighborDistance;
        }
        neighbor.previousNode = node;
    }
}