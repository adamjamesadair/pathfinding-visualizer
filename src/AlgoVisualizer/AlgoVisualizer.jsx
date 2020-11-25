import React, {Component} from 'react';
import Node from './Node/Node';
import Stats from './Stats/Stats';
import Legend from './Legend/Legend';

import {computeDijkstra} from '../Algorithms/Search/dijkstra';
import {computeAStar} from '../Algorithms/Search/aStar';
import {computeDFS} from '../Algorithms/Search/dfs';
import {computeBFS} from '../Algorithms/Search/bfs';
import {getInitialGrid, resetGrid, clearPath, createNode, randomInteger, getRandomEmptyNodeCoords, visualizAlgorithm} from '../Algorithms/helpers';
import './AlgoVisualizer.css';  
import { visualizeRecursiveDivision } from '../Algorithms/Generator/recursiveDivision';

export default class AlgoVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            startNodeCoords: [5, 10],
            finishNodeCoords: [7, 40],
            checkpointNodes: [],
            draggingCheckpointNodeInfo: {},
            running: false,
            dragging: "",
            isPathDrawn: false,
            lastAlgoRunString: "",
            runTimeSeconds: 0,
            numNodesInPath: 0,
            numVisitedNodes: 0,
            numWalls: 0
        };
    }

    componentDidMount(){
        const grid = getInitialGrid(this);
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        var type = this.state.grid[row][col].type;
        var { running, grid, numWalls, checkpointNodes, draggingCheckpointNodeInfo } = this.state;

        if(running) return; 

        if(type === "wallNode" || type === "default") {
            numWalls = type === "wallNode" ? numWalls - 1 : numWalls + 1;
            const newGrid = getWallUpdatedGrid(grid, row, col);
            this.setState({ grid: newGrid, dragging: type, numWalls });
        } else if (type === "checkpointNode") {
            // Keep track of which checkpoiontNode is being dragged
            checkpointNodes.forEach(checkpointNodeInfo => {
                if (checkpointNodeInfo.coords[0] === row && checkpointNodeInfo.coords[1] === col) {
                    draggingCheckpointNodeInfo = checkpointNodeInfo;
                }
            });
            this.setState({ dragging: type, draggingCheckpointNodeInfo });
        } else {
            this.setState({ dragging: type });
        }
        
    }
    
    handleMouseEnter(row, col) {
        const enteredNodeType = this.state.grid[row][col].type;
        var newGrid = this.state.grid;
        var { running, dragging, numWalls, startNodeCoords, finishNodeCoords, checkpointNodes, draggingCheckpointNodeInfo } = this.state;

        if(running || dragging === "") return;

        if(["startNode", "finishNode", "checkpointNode"].includes(dragging)) {
            newGrid = dragging === "checkpointNode" 
                ? getNodeUpdatedGrid(newGrid, row, col, dragging, draggingCheckpointNodeInfo.id)
                : getNodeUpdatedGrid(newGrid, row, col, dragging);

            if(enteredNodeType === "wallNode") {
                numWalls -= 1;
            } else {
                const randomEmptyNodeCoords = getRandomEmptyNodeCoords(this);
                if(enteredNodeType === "finishNode") {
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "finishNode");
                    finishNodeCoords = randomEmptyNodeCoords;
                } else if(enteredNodeType === "startNode") {
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "startNode");
                    startNodeCoords = randomEmptyNodeCoords;
                } else if(enteredNodeType === "checkpointNode") {
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "checkpointNode", draggingCheckpointNodeInfo.text);
                    // Update checkpointNode state
                    draggingCheckpointNodeInfo.coords = [row, col];
                    checkpointNodes.forEach(checkpointNodeInfo => {
                        if(checkpointNodeInfo.id === draggingCheckpointNodeInfo.id) checkpointNodeInfo = draggingCheckpointNodeInfo;
                    });
                }
            }
        } else if(dragging === "default") {
            numWalls = enteredNodeType === "wallNode" ? numWalls - 1 : numWalls + 1;
            newGrid = getWallUpdatedGrid(newGrid, row, col);
        }
        this.setState({ grid: newGrid, numWalls, startNodeCoords, finishNodeCoords, checkpointNodes, draggingCheckpointNodeInfo });
    }
    
    handleMouseLeave(row, col){
        if(this.state.running) return;
        if(["startNode", "finishNode", "checkpointNode"].includes(this.state.dragging)){
            if(this.state.isPathDrawn) clearPath(this);
            this.setState({ grid: getNodeUpdatedGrid(this.state.grid, row, col, "default") });
        }
    }

    handleMouseUp(row, col) {
        var { running, grid, dragging, checkpointNodes, draggingCheckpointNodeInfo } = this.state;
        if(running) return;
        if(dragging === "startNode"){
            const newGrid = getNodeUpdatedGrid(grid, row, col, "startNode");
            this.setState({ grid: newGrid, dragging: "", startNodeCoords: [row, col] });
        } else if(dragging === "finishNode") {
            const newGrid = getNodeUpdatedGrid(grid, row, col, "finishNode");
            this.setState({ grid: newGrid, dragging: "", finishNodeCoords: [row, col] });
        } else if(dragging === "checkpointNode") {
            const newGrid = getNodeUpdatedGrid(grid, row, col, "checkpointNode", draggingCheckpointNodeInfo.id);
            checkpointNodes.forEach(checkpointNodeInfo => {
                if(checkpointNodeInfo.id === draggingCheckpointNodeInfo.id) checkpointNodeInfo.coords = [row, col];
            });
            this.setState({ grid: newGrid, dragging: "", checkpointNodes });
        }
        this.setState({ dragging: "" });
    }
  
    getEmptyNodes(grid) {
        var emptyNodes = [];
        // Get all empty nodes
        for(var row of grid){
            var newRow = row.filter(node => node.type === "default");
            if(newRow.length > 0) emptyNodes.push(newRow);
        }
        return emptyNodes;
    }

    randomizeStartFinishNodes() {
        var {grid, startNodeCoords, finishNodeCoords } = this.state;
        
        grid[startNodeCoords[0]][startNodeCoords[1]] = createNode(startNodeCoords[0], startNodeCoords[1], "default", Infinity);
        grid[finishNodeCoords[0]][finishNodeCoords[1]] = createNode(finishNodeCoords[0], finishNodeCoords[1], "default", Infinity);
        
        // Get all empty nodes
        var emptyNodes = this.getEmptyNodes(grid);

        if(emptyNodes.length > 0) {
            var startNodeRow = randomInteger(0, emptyNodes.length - 1);
            var startNode = emptyNodes[startNodeRow][randomInteger(0, emptyNodes[startNodeRow].length - 1)];
            var finishNodeRow = randomInteger(0, emptyNodes.length - 1);
            var finishNode = emptyNodes[finishNodeRow][randomInteger(0, emptyNodes[finishNodeRow].length - 1)];
    
            startNodeCoords = [startNode.row, startNode.col];
            finishNodeCoords = [finishNode.row, finishNode.col];
            
            grid[startNodeCoords[0]][startNodeCoords[1]] = createNode(startNodeCoords[0], startNodeCoords[1], "startNode", 0);
            grid[finishNodeCoords[0]][finishNodeCoords[1]] = createNode(finishNodeCoords[0], finishNodeCoords[1], "finishNode", Infinity);
            
            this.setState({ grid, startNodeCoords, finishNodeCoords });
        }
    }

    addCheckpointNode(){
        var { grid, checkpointNodes, isPathDrawn } = this.state;

        // If there is a path, clear it and mark checkpoints as unvisited 
        if(isPathDrawn) {
            clearPath(this);
            // Reset checkpoint node states
            for(let checkpointNodeInfo of checkpointNodes){
                checkpointNodeInfo.isVisited = false;
            }
        }
        
        // Get all empty nodes
        var emptyNodes = this.getEmptyNodes(grid);

        // If there is empty space, add a checkpoint node
        if(emptyNodes.length > 0) {
            var checkpointNodeRow = randomInteger(0, emptyNodes.length - 1);
            var checkpointNode = emptyNodes[checkpointNodeRow][randomInteger(0, emptyNodes[checkpointNodeRow].length - 1)];
            var checkpointNodeCoords = [checkpointNode.row, checkpointNode.col];
            var checkpointNodeInfo = {
                id:checkpointNodes.length + 1,
                coords:checkpointNodeCoords,
                isVisited:false
            };
    
            grid[checkpointNodeCoords[0]][checkpointNodeCoords[1]] = createNode(checkpointNodeCoords[0], checkpointNodeCoords[1], "checkpointNode", Infinity, checkpointNodeInfo.id);
            
            checkpointNodes.push(checkpointNodeInfo);
            // Update the state
            this.setState({ grid, checkpointNodes });
        }
    }

    getDestinationNodeInfo() {
        var { checkpointNodes, finishNodeCoords } = this.state;
        for(var checkpointNodeInfo of checkpointNodes.reverse()) {
            if(!checkpointNodeInfo.isVisited) return checkpointNodeInfo;
        }

        return {id:0, coords:finishNodeCoords, isVisited: false};
    }

    render() {
        const {grid, startNodeCoords, finishNodeCoords, runTimeSeconds, numNodesInPath, numVisitedNodes, numWalls, lastAlgoRunString} = this.state;

        return (
            <div className='body'>
                <div className='menu'>
                    <h1 className='title'>Pathfinding Visualizer</h1>
                    <div className='menu-group-container'>
                        <div className='menu-group'>
                            <h2>Pathfinding</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeDijkstra, "Dijkstra", this, grid, startNodeCoords, finishNodeCoords)}>Dijkstra's Algorithm</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeAStar, "A*", this, grid, startNodeCoords, finishNodeCoords)}>A*</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeDFS, "DFS", this, grid, startNodeCoords, finishNodeCoords)}>DFS</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeBFS, "BFS", this, grid, startNodeCoords, finishNodeCoords)}>BFS</button>
                        </div>
                        <div className='menu-group'>
                            <h2>Generators</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeRecursiveDivision(this, grid, startNodeCoords, finishNodeCoords)}>Recursive Division</button>
                        </div>
                        <div className='menu-group'>
                            <h2>Board Options</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> this.addCheckpointNode()}>Add checkpoint</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> resetGrid(this)}>Clear Board</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> clearPath(this)}>Clear Path</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> clearPath(this, this.randomizeStartFinishNodes)}>Randomize Start and End Nodes</button>
                        </div>
                    </div>
                </div>

                <div className="grid-container">
                    <Legend></Legend>
                    <Stats
                        runTimeSeconds={runTimeSeconds}
                        numNodesInPath={numNodesInPath}
                        numVisitedNodes={numVisitedNodes}
                        numWalls={numWalls}
                        lastAlgoRunString={lastAlgoRunString}
                        ></Stats>
                    <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {row.map((node, nodeIdx) => {
                                        const { row, col, type, distance, text } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                className='node'
                                                row={row}
                                                col={col}
                                                type={type}
                                                text={text}
                                                distance={distance}
                                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                                onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                                                onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}
                                            ></Node>);
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                
            </div>
        );
    }
}

function getWallUpdatedGrid(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        type: node.type === "wallNode" ? "default" : node.type === "default" ? "wallNode" : node.type
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

function getNodeUpdatedGrid(grid, row, col, type, text="") {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    var newNode = {
        ...node,
        text,
        type
    };

    newGrid[row][col] = newNode;
    return newGrid;
}