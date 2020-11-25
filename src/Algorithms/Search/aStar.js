import { animateAlgorithm, sortNodesByDistanceAndHeuristic, getAllNodes, getNeighbors, getNodesInShortestPathOrder, clearPath, getEuclideanDistance } from '../helpers.js';
import _ from "lodash";

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
        updateneighbors(closestNode, grid);
    }
}

export function visualizeAStar(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    var startTime, runTimeSeconds, destinationNodeInfo, gridCopy;
    var { originalStartNodeCoords, checkpointNodes } = algoVisualizer.state;
    var visitedNodesInOrder = [];
    var nodesInShortestPathOrder = [];

    algoVisualizer.setState({running: true, isPathDrawn: true});
    clearPath(algoVisualizer);

    while(algoVisualizer.getDestinationNodeInfo().coords !== finishNodeCoords) {
        destinationNodeInfo = algoVisualizer.getDestinationNodeInfo();
        startTime = new Date().getTime();
        gridCopy = _.cloneDeep(grid);
        gridCopy[originalStartNodeCoords[0]][originalStartNodeCoords[1]].distance = Infinity;
        visitedNodesInOrder.push(computeAStar(gridCopy, startNodeCoords, destinationNodeInfo.coords));
        nodesInShortestPathOrder.push(getNodesInShortestPathOrder(gridCopy[destinationNodeInfo.coords[0]][destinationNodeInfo.coords[1]]));
        runTimeSeconds = new Date().getTime() - startTime;
        startNodeCoords = destinationNodeInfo.coords;
        destinationNodeInfo.isVisited = true;
        checkpointNodes[destinationNodeInfo.id - 1] = destinationNodeInfo;
    }
    
    startTime = new Date().getTime();
    gridCopy = _.cloneDeep(grid);
    visitedNodesInOrder.push(computeAStar(gridCopy, startNodeCoords, finishNodeCoords));
    nodesInShortestPathOrder.push(getNodesInShortestPathOrder(gridCopy[finishNodeCoords[0]][finishNodeCoords[1]]));
    runTimeSeconds = new Date().getTime() - startTime;

    animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder);
    algoVisualizer.setState({visitedNodesToAnimate: visitedNodesInOrder, pathNodesToAnimate: nodesInShortestPathOrder, checkpointNodes, isPathDrawn: true, runTimeSeconds, lastAlgoRunString: "A*"});
}

function updateneighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    const weight = 1;
    for (const neighbor of neighbors) {
        if(neighbor.isVisited){
            if(neighbor.distance - neighbor.heuristic < node.previousNode.distance - node.previousNode.heuristic){
                node.previousNode = neighbor;
            }
        } else {
            if(node.distance === 0){
                neighbor.distance = weight + neighbor.heuristic; 
            } else {
                neighbor.distance = node.distance - node.heuristic + weight + neighbor.heuristic;
            }
            neighbor.previousNode = node;
        }
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