import _ from "lodash";

export function animateAlgorithm(algoVisualizer, visitedNodesInOrderList, nodesInShortestPathOrderList) {
    const delay = 10;
    const shortestPathDelay = 25;
    var numVisitedNodes = 0;
    var numNodesInPath = 0;

    numVisitedNodes += visitedNodesInOrderList.length;
    for (let i = 0; i < visitedNodesInOrderList.length; i++) {
        if (i === visitedNodesInOrderList.length - 1) {
            numNodesInPath += new Set(nodesInShortestPathOrderList).size;
            // Animate the shortest path
            setTimeout(() => {
                animateShortestPath(algoVisualizer, nodesInShortestPathOrderList, shortestPathDelay);
            }, delay * i);
        }
        
        setTimeout(() => {
            const node = visitedNodesInOrderList[i];
            var oldClasses = document.getElementById(`node-${node.row}-${node.col}`).className
            // Animate the current node
            document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-current';
            // Animate the visted nodes
            setTimeout(()=>{
                document.getElementById(`node-${node.row}-${node.col}`).className = oldClasses + ' node-visited';
            }, delay);
        }, delay * i);
    }
    algoVisualizer.setState({ numVisitedNodes, numNodesInPath });
}

function animateShortestPath(algoVisualizer, nodesInShortestPathOrder, delay=25) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            // Redraw element to restart animation on nodes with class node-shortest-path
            var nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
            nodeElement.className = nodeElement.className.replace(" node-shortest-path", "");
            setTimeout(()=>{nodeElement.className = nodeElement.className + ' node-shortest-path';}, 10);
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
            // Animate the walls
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

export function getNeighbors(node, grid) {
    const neighbors = [];
    const {row, col} = node;

    if(row > 0) neighbors.push(grid[row-1][col]);
    if(row + 1 < grid.length) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col + 1 < grid[0].length) neighbors.push(grid[row][col + 1]);

    return neighbors;
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

export function sortNodesByDistanceAndHeuristic(nodes){
    nodes.sort(function (nodeA, nodeB) {
        // Sort on distance
        if(nodeA.distance > nodeB.distance) {
            return 1;
        } else if (nodeA.distance < nodeB.distance) {
            return -1;
        } else {
            // If the distances are the same,
            // sort on distance - heuristic
            if(nodeA.heuristic > nodeB.heuristic) {
                return 1;
            } else if (nodeA.heuristic < nodeB.heuristic) {
                return -1;
            } else {
                return 0;
            }
        }
    });
}

export function clearPath(algoVisualizer, callback=null) {
    var { grid } = algoVisualizer.state;
    
    for(const row of grid) {
        for(var node of row){
            // update node values
            var distance = node.type === "startNode" ? 0 : Infinity; 
            grid[node.row][node.col] = createNode(node.row, node.col, node.type, distance, node.text);
            // update css class
            if(node.type === "default"){
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            } else if(node.type === "checkpointNode") {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-checkpoint';
            }
        }
    }
    algoVisualizer.setState({ grid, isPathDrawn: false, numNodesInPath: 0, numVisitedNodes: 0 }, callback);
}

export function createNode(row, col, type, distance, text="") {
    return {
        row,
        col,
        type,
        text,
        distance,
        heuristic: 0,
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
    var { grid, startNodeCoords, finishNodeCoords } = algoVisualizer.state;

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
    algoVisualizer.setState({ grid, numWalls: 0, numNodesInPath: 0, numVisitedNodes: 0, checkpointNodes: [] }, callback);
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

export function getRandomEmptyNodeCoords(algoVisualizer){
    var { grid } = algoVisualizer.state;
    var emptyNodes = [];
    // Get all empty nodes
    for(var row of grid){
        var newRow = row.filter(node => node.type === "default");
        if(newRow.length > 0) emptyNodes.push(newRow);
    }

    if(emptyNodes.length > 0) {
        var nodeRow = randomInteger(0, emptyNodes.length - 1);
        var node = emptyNodes[nodeRow][randomInteger(0, emptyNodes[nodeRow].length - 1)];
        return [node.row, node.col];
    }
}

export function visualizAlgorithm(computeAlgorithm, lastAlgoRunString, algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    var startTime, runTimeSeconds, destinationNodeInfo, gridCopy, startNode, finishNode;
    var originalStartNodeCoords = algoVisualizer.state.startNodeCoords;
    var visitedNodesInOrder = [];
    var nodesInShortestPathOrder = [];
    var checkpointNodes = algoVisualizer.state.checkpointNodes;
    var isPathPossible = true;
    var shortestPath = [];
    checkpointNodes.sort((nodeA, nodeB) => nodeA.id - nodeB.id);

    algoVisualizer.setState({running: true, isPathDrawn: true});
    clearPath(algoVisualizer);
    // Reset the checkpoint nodes
    for(var checkpointNodeInfo of checkpointNodes) {
        checkpointNodeInfo.isVisited = false;
        checkpointNodeInfo.distance = Infinity;
    }

    while(algoVisualizer.getDestinationNodeInfo().coords !== finishNodeCoords) {
        destinationNodeInfo = algoVisualizer.getDestinationNodeInfo();
        startTime = new Date().getTime();
        gridCopy = _.cloneDeep(grid);
        gridCopy[originalStartNodeCoords[0]][originalStartNodeCoords[1]].distance = Infinity;
        gridCopy[startNodeCoords[0]][startNodeCoords[1]].distance = 0;
        if(lastAlgoRunString === "DFS") {
            startNode = gridCopy[startNodeCoords[0]][startNodeCoords[1]];
            finishNode = gridCopy[destinationNodeInfo.coords[0]][destinationNodeInfo.coords[1]];
            visitedNodesInOrder.push(computeAlgorithm(gridCopy, startNode, finishNode, [])[1]);
        } else {
            visitedNodesInOrder.push(computeAlgorithm(gridCopy, startNodeCoords, destinationNodeInfo.coords));
        }
        shortestPath = getNodesInShortestPathOrder(gridCopy[destinationNodeInfo.coords[0]][destinationNodeInfo.coords[1]])
        nodesInShortestPathOrder.push(shortestPath);
        runTimeSeconds = new Date().getTime() - startTime;
        startNodeCoords = destinationNodeInfo.coords;
        destinationNodeInfo.isVisited = true;
        for(let checkpointNodeInfo of checkpointNodes) {
            if(checkpointNodeInfo.id === destinationNodeInfo.id - 1) checkpointNodeInfo = destinationNodeInfo;
        }

        if(shortestPath.length <= 1) {
            isPathPossible = false;
            break;
        }
    }
    
    if(isPathPossible) {
        startTime = new Date().getTime();
        gridCopy = _.cloneDeep(grid);
        gridCopy[originalStartNodeCoords[0]][originalStartNodeCoords[1]].distance = Infinity;
        gridCopy[startNodeCoords[0]][startNodeCoords[1]].distance = 0;
        if(lastAlgoRunString === "DFS") {
            startNode = gridCopy[startNodeCoords[0]][startNodeCoords[1]];
            finishNode = gridCopy[finishNodeCoords[0]][finishNodeCoords[1]];
            visitedNodesInOrder.push(computeAlgorithm(gridCopy, startNode, finishNode, [])[1]);
        } else {
            visitedNodesInOrder.push(computeAlgorithm(gridCopy, startNodeCoords, finishNodeCoords));
        }
        nodesInShortestPathOrder.push(getNodesInShortestPathOrder(gridCopy[finishNodeCoords[0]][finishNodeCoords[1]]));
        runTimeSeconds = new Date().getTime() - startTime;
        animateAlgorithm(algoVisualizer, visitedNodesInOrder.flat(), nodesInShortestPathOrder.flat());
    } else {
        animateAlgorithm(algoVisualizer, visitedNodesInOrder.flat(), []);
    }

    algoVisualizer.setState({ visitedNodesToAnimate: visitedNodesInOrder, pathNodesToAnimate: nodesInShortestPathOrder, checkpointNodes, isPathDrawn: true, runTimeSeconds, lastAlgoRunString});
}