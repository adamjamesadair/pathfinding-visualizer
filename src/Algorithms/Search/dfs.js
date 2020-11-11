import { animateAlgorithm, getUnvisitedNeighbors, getNodesInShortestPathOrder, clearPath } from '../helpers.js';

function computeDFS(grid, currentNode, finishNode, visitedNodes) {
    visitedNodes.push(currentNode);
    currentNode.isVisited = true;
    if(currentNode === finishNode) return [visitedNodes, visitedNodes];
    for(let unvisitedNeighbor of getUnvisitedNeighbors(currentNode, grid).filter(neighbor => neighbor.type !== "wallNode")) {
        if(!unvisitedNeighbor.isVisited){
            unvisitedNeighbor.previousNode = currentNode;
            var newVisitedNodes = computeDFS(grid, unvisitedNeighbor, finishNode, visitedNodes)[0];
            if(newVisitedNodes) return [newVisitedNodes, newVisitedNodes];
        }
    }
    return [null, visitedNodes];
}

export function visualizeDFS(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    algoVisualizer.setState({running: true});
    clearPath(algoVisualizer);
    const startNode = grid[startNodeCoords[0]][startNodeCoords[1]];
    const finishNode = grid[finishNodeCoords[0]][finishNodeCoords[1]];
    const visitedNodesInOrder = computeDFS(grid, startNode, finishNode, [])[1];
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
    if(visitedNodesInOrder) animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder); else algoVisualizer.setState({running: false});
    algoVisualizer.setState({isPathDrawn: true});
}