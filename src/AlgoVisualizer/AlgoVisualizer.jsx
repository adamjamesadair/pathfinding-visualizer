import React, {Component} from 'react';
import Node from './Node/Node';
import Stats from './Stats/Stats';
import Legend from './Legend/Legend';
import TutorialModal from './TutorialModal/TutorialModal';

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
            numWalls: 0,
            numWeights: 0,
            weight: 5,
            drawMode: "wall",
            showModal: true,
            tutorialPageNum: 1
        };
    }

    componentDidMount(){
        const grid = getInitialGrid(this);
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        var type = this.state.grid[row][col].type;
        var { drawMode, running, grid, numWalls, numWeights, weight, checkpointNodes, draggingCheckpointNodeInfo } = this.state;
        var newGrid;
        var nodeType = "default";

        if(running) return; 

        if(["wallNode", "weightNode", "default"].includes(type)) {
            if(type === "wallNode") numWalls -= 1;
            if(type === "weightNode") numWeights -= 1;

            if(drawMode === "weight") {
                if(["default", "wallNode"].includes(type)) {
                    numWeights += 1;
                    nodeType = "weightNode";
                }
                newGrid = getNodeUpdatedGrid(grid, row, col, nodeType, "", weight);
            }
            if(drawMode === "wall") {
                if(["default", "weightNode"].includes(type)) numWalls += 1;
                newGrid = getWallUpdatedGrid(grid, row, col);
            }
            this.setState({ grid: newGrid, dragging: type, numWalls, numWeights });
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
        var { grid, running, dragging, drawMode, weight, numWalls, numWeights, startNodeCoords, finishNodeCoords, checkpointNodes, draggingCheckpointNodeInfo } = this.state;
        const enteredNodeType = grid[row][col].type;
        var enteredNodeID = "";
        var newGrid = grid;
        var nodeType = "";

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
                    // Update checkpointNode state
                    checkpointNodes.forEach(checkpointNodeInfo => {
                        if(checkpointNodeInfo.coords[0] === row && checkpointNodeInfo.coords[1] === col) {
                            checkpointNodeInfo.coords = randomEmptyNodeCoords;
                            enteredNodeID = checkpointNodeInfo.id;
                        }
                    });
                    draggingCheckpointNodeInfo.coords = [row, col];
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "checkpointNode", enteredNodeID);
                }
            }
        } else {
            if(drawMode === "wall") {
                numWalls = enteredNodeType === "wallNode" ? numWalls - 1 : numWalls + 1;
                newGrid = getWallUpdatedGrid(newGrid, row, col);
            }else if(drawMode === "weight") {
                if(enteredNodeType === "weightNode") {
                    numWeights -= 1;
                    nodeType = "default";
                    weight = 1;
                } else {
                    if(enteredNodeType === "wallNode") numWalls -= 1;
                    numWeights += 1;
                    nodeType = "weightNode";
                }
                newGrid = getNodeUpdatedGrid(newGrid, row, col, nodeType, "", weight);
            }
        }
        this.setState({ grid: newGrid, numWalls, numWeights, startNodeCoords, finishNodeCoords, checkpointNodes, draggingCheckpointNodeInfo });
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
        if(isPathDrawn) clearPath(this);
        
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

    toggleNodeDrawType(){
        this.setState({ drawMode: this.state.drawMode === "wall" ? "weight" : "wall" });
    }

    getDestinationNodeInfo() {
        var { checkpointNodes, finishNodeCoords } = this.state;
        for(var checkpointNodeInfo of checkpointNodes.reverse()) {
            if(!checkpointNodeInfo.isVisited) return checkpointNodeInfo;
        }

        return {id:0, coords:finishNodeCoords, isVisited: false};
    }

    toggleShowModal() {
        this.setState({tutorialPageNum: 1, showModal: !this.state.showModal});
    }

    render() {
        const {grid, startNodeCoords, finishNodeCoords, runTimeSeconds, numNodesInPath, numVisitedNodes, numWalls, numWeights, weight, lastAlgoRunString} = this.state;

        return (
            <div className='body'>
                <div className='menu'>
                    <h1 className='title'>Pathfinding Visualizer</h1>
                    <div className='menu-group-container'>
                        <div className='menu-group'>
                            <h2>Pathfinding</h2>
                            <div className='menu-subgroup'>
                                <h3>Weighted</h3>
                                <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeDijkstra, "Dijkstra", this, grid, startNodeCoords, finishNodeCoords)}>Dijkstra</button>
                                <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeAStar, "A*", this, grid, startNodeCoords, finishNodeCoords)}>A*</button>
                            </div>
                            <div className='menu-subgroup'>
                                <h3>Unweighted</h3>
                                <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeDFS, "DFS", this, grid, startNodeCoords, finishNodeCoords)}>DFS</button>
                                <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizAlgorithm(computeBFS, "BFS", this, grid, startNodeCoords, finishNodeCoords)}>BFS</button>
                            </div>
                        </div>
                        <div className='menu-group'>
                            <h2>Generators</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeRecursiveDivision(this, grid, startNodeCoords, finishNodeCoords)}>Recursive Division</button>
                        </div>
                        <div className='menu-group'>
                            <h2>Board Options</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> this.addCheckpointNode()}>Add Checkpoint</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> this.toggleNodeDrawType()}>Draw: {this.state.drawMode.charAt(0).toUpperCase() + this.state.drawMode.slice(1)}</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> resetGrid(this)}>Clear Board</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> clearPath(this)}>Clear Path</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> clearPath(this, this.randomizeStartFinishNodes)}>Randomize Start and End Nodes</button>
                        </div>
                    </div>
                </div>

                <div className="grid-container">
                    <button className="btn help-btn" onClick={()=> this.toggleShowModal()}><p className='help-txt'>?</p></button>
                    <Legend></Legend>
                    <Stats
                        runTimeSeconds={runTimeSeconds}
                        numNodesInPath={numNodesInPath}
                        numVisitedNodes={numVisitedNodes}
                        numWalls={numWalls}
                        numWeights={numWeights}
                        weightValue={weight}
                        lastAlgoRunString={lastAlgoRunString}
                        ></Stats>
                    <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {row.map((node, nodeIdx) => {
                                        const { row, col, type, distance, text, weight } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                className='node'
                                                row={row}
                                                col={col}
                                                type={type}
                                                text={text}
                                                weight={weight}
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

                <TutorialModal
                    show={this.state.showModal}
                    pageNum={this.state.tutorialPageNum}
                    onHide={() => this.toggleShowModal()}
                    onNext={() => this.setState({tutorialPageNum: this.state.tutorialPageNum + 1})}
                    onBack={() => this.setState({tutorialPageNum: this.state.tutorialPageNum > 0 ? this.state.tutorialPageNum - 1 : 0})}
                />
                
            </div>
        );
    }
}

function getWallUpdatedGrid(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        type: node.type === "wallNode" ? "default" : node.type === "default" || node.type === "weightNode" ? "wallNode" : node.type
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

function getNodeUpdatedGrid(grid, row, col, type, text="", weight=1) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    var newNode = {
        ...node,
        weight,
        text,
        type
    };

    newGrid[row][col] = newNode;
    return newGrid;
}