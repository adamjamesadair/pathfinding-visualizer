export function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return;
      }
      
      setTimeout(() => {
          const node = visitedNodesInOrder[i];
          var oldClasses = document.getElementById(`node-${node.row}-${node.col}`).className
          document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-current';
          setTimeout(()=>{
              document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-visited';
          }, 10);
      }, 10 * i);
  }
}

function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className = 
          document.getElementById(`node-${node.row}-${node.col}`).className + ' node-shortest-path';
      }, 50 * i);
  }
}

export function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {row, col} = node;

    if(row > 0) neighbors.push(grid[row-1][col]);
    if(row + 1 < grid.length) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col + 1 < grid[0].length) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
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

export function sortNodesByDistance(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}