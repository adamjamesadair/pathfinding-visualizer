export function computeDijkstra(grid, startNodeCoords, finishNodeCoords) {
    const startNode = grid[startNodeCoords[0]][startNodeCoords[1]];
    startNode.distance = 0;
    const finishNode = grid[finishNodeCoords[0]][finishNodeCoords[1]];
    var visitedNodes = [];
    
    var currentNode = startNode;
    const unvisitedNodes = getAllNodes(grid);

    while(unvisitedNodes.length){
        // Get the unvisitied neighbors
        var unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        // Sort the neighbors by distance
        sortNodesByDistance(unvisitedNeighbors);
        // Visit the closest unvisited neighbor
        closestNode = unvisitedNeighbors.unshift();
        visitedNodes.push(closestNode);
        // Mark the node as visited
        closestNode.isVisited = true;
        // Check if the current node is the finish node
        if(currentNode == finishNode) return visitedNodes;
    }

    // Get closest node
    var closestNode = grid[0][0];
    {grid.map((row)=> {
        {row.map((node)=>{
            if (node.distance < closestNode.distance){
                closestNode = node;
            }
        })}
    })}
    console.log(closestNode)
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