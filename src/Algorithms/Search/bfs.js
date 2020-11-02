import { animateAlgorithm, getUnvisitedNeighbors, getNodesInShortestPathOrder, clearPath } from '../helpers.js';

function computeBFS(grid, startNode, finishNode) {
    var queue = [startNode];
    var path = [startNode];
    startNode.isVisited = true;

    if(startNode === finishNode) return path;

    while(queue){
        startNode = queue.shift();

        for(var neighbor of getUnvisitedNeighbors(startNode, grid).filter(neighbor => neighbor.type !== "wallNode")){
            if(!path.includes(neighbor)){
                neighbor.previousNode = startNode;
                neighbor.isVisited = true;
                path.push(neighbor);
                queue.push(neighbor);

                if(neighbor === finishNode) return path;
            }
        }
    }
    return path;
}

export function visualizeBFS(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    algoVisualizer.setState({running: true});
    clearPath(algoVisualizer);
    const startNode = grid[startNodeCoords[0]][startNodeCoords[1]];
    const finishNode = grid[finishNodeCoords[0]][finishNodeCoords[1]];
    const visitedNodesInOrder = computeBFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
    animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder);
}