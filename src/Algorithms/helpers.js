export function animateAlgorithm(algoVisualizer, visitedNodesInOrder, nodesInShortestPathOrder) {
    const delay = 10;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            // Animate the shortest path
            setTimeout(() => {
                animateShortestPath(algoVisualizer, nodesInShortestPathOrder);
            }, delay * i);
            return;
        }
        
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            var oldClasses = document.getElementById(`node-${node.row}-${node.col}`).className
            // Animate the current node
            document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-current';
            // Animate the visted nodes
            setTimeout(()=>{
                document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-visited';
            }, delay);
        }, delay * i);
    }
}

function animateShortestPath(algoVisualizer, nodesInShortestPathOrder) {
    const delay = 25;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 
            document.getElementById(`node-${node.row}-${node.col}`).className + ' node-shortest-path';
        }, delay * i);
    }
    setTimeout(()=>{algoVisualizer.setState({running: false});}, delay * nodesInShortestPathOrder.length);
}

export function animateGeneration(algoVisualizer, generatedWallsInOrder, callback=null) {
    const { grid } = algoVisualizer.state;
    const delay = 10;
    for (let i = 0; i < generatedWallsInOrder.length; i++) {
        setTimeout(() => {
            const node = generatedWallsInOrder[i];
            var oldClasses = document.getElementById(`node-${node.row}-${node.col}`).className
            // Animate the current node
            document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-current';
            // Animate the visted nodes
            setTimeout(()=>{
                document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-wall';
            }, delay);
        }, delay * i);
    }
    setTimeout(()=>{
        algoVisualizer.setState({running: false});
        if(callback) callback(algoVisualizer, grid, generatedWallsInOrder);
    }, delay * generatedWallsInOrder.length);
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

export function clearPath(algoVisualizer, callback=null) {
    var {grid} = algoVisualizer.state;
    
    for(const row of grid) {
        for(var node of row){
            // update node values
            var distance = node.type === "startNode" ? 0 : Infinity; 
            grid[node.row][node.col] = createNode(node.row, node.col, node.type, distance);
            // update css class
            if(node.type === "default"){
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            }
        }
    }
    algoVisualizer.setState({ grid }, callback);
}

export function createNode(row, col, type, distance) {
    return {
        row,
        col,
        type,
        distance,
        isVisited: false,
        previousNode: null
    }
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomEvenInteger(min, max) {
    var temp =(Math.floor(Math.random() * (Math.floor(max/2) - min + 1)) + min) * 2;
    return temp;
}

export function randomOddInteger(min, max) {
    var temp = (Math.floor(Math.random() * (Math.floor(max/2) - min + 1)) + min) * 2 + 1;
    return temp;
}

export function resetGrid(algoVisualizer, callback) {
    var {grid, startNodeCoords, finishNodeCoords} = algoVisualizer.state;

    // reset node classnames
    for (const row of grid) {
        for (const node of row) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
    }

    // set start and finish node classnames
    document.getElementById(`node-${startNodeCoords[0]}-${startNodeCoords[1]}`).className = 'node node-start';
    document.getElementById(`node-${finishNodeCoords[0]}-${finishNodeCoords[1]}`).className = 'node node-finish';
    grid = getInitialGrid(algoVisualizer);
    algoVisualizer.setState({ grid }, callback);
}

export function getInitialGrid(algoVisualizer){
    // Generate the empty grid
    const grid = [];
    const nodesPerRow = 20;
    const nodesPerCol = 50;
    for (let row = 0; row < nodesPerRow; row++) {
        const currentRow = [];
        for (let col = 0; col < nodesPerCol; col++) {
            currentRow.push(createNode(row, col, "default", Infinity));
        }
        grid.push(currentRow);
    }

    // Set the start and finish nodes
    const [startRow, startCol] = algoVisualizer.state.startNodeCoords;
    const [finishRow, finishCol] = algoVisualizer.state.finishNodeCoords;
    grid[startRow][startCol] = createNode(startRow, startCol, "startNode", 0);
    grid[finishRow][finishCol] = createNode(finishRow, finishCol, "finishNode", Infinity);
    return grid;
};

export function getEuclideanDistance(x1, y1, x2, y2){
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt( a*a + b*b );
}