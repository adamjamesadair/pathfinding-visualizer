import React, {Component} from 'react';
import Node from './Node/Node';
import Stats from './Stats/Stats';
import Legend from './Legend/Legend';

import {visualizeDijkstra} from '../Algorithms/Search/dijkstra';
import {visualizeAStar} from '../Algorithms/Search/aStar';
import {visualizeDFS} from '../Algorithms/Search/dfs';
import {visualizeBFS} from '../Algorithms/Search/bfs';
import {getInitialGrid, resetGrid, clearPath, createNode, randomInteger, getRandomEmptyNodeCoords} from '../Algorithms/helpers';
import './AlgoVisualizer.css';  
import { visualizeRecursiveDivision } from '../Algorithms/Generator/recursiveDivision';

export default class AlgoVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            startNodeCoords: [5, 10],
            finishNodeCoords: [7, 40],
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
        var numWalls = this.state.numWalls;
        if(!this.state.running){
            if(type === "startNode") {
                this.setState({ dragging: "startNode" });
            } else if(type === "finishNode"){
                this.setState({ dragging: "finishNode" });
            } else {
                numWalls = type === "wallNode" ? numWalls - 1 : numWalls + 1;
                const newGrid = getWallUpdatedGrid(this.state.grid, row, col);
                this.setState({ grid: newGrid, dragging: "wallNode", numWalls });
            }
        }
    }
    
    handleMouseEnter(row, col) {
        const enteredNodeType = this.state.grid[row][col].type;
        var newGrid = this.state.grid;
        var numWalls = this.state.numWalls;

        if(!this.state.dragging === "") return;
        if(!this.state.running){
            if(this.state.dragging === "startNode"){
                if(enteredNodeType === "finishNode"){
                    const randomEmptyNodeCoords = getRandomEmptyNodeCoords(this);
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "finishNode");
                    this.setState({ finishNodeCoords: randomEmptyNodeCoords });
                } else if(enteredNodeType === "wallNode") {
                    numWalls -= 1;
                }
                newGrid = getNodeUpdatedGrid(newGrid, row, col, "startNode");
                this.setState({ grid: newGrid, numWalls });
            } else if(this.state.dragging === "finishNode") {
                if(enteredNodeType === "startNode"){
                    const randomEmptyNodeCoords = getRandomEmptyNodeCoords(this);
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "startNode");
                    this.setState({ startNodeCoords: randomEmptyNodeCoords });
                } else if(enteredNodeType === "wallNode") {
                    numWalls -= 1;
                }
                newGrid = getNodeUpdatedGrid(newGrid, row, col, "finishNode");
                this.setState({ grid: newGrid, numWalls });

            } else if(this.state.dragging === "wallNode") {
                numWalls = enteredNodeType === "wallNode" ? numWalls - 1 : numWalls + 1;
                newGrid = getWallUpdatedGrid(newGrid, row, col);
                this.setState({ grid: newGrid, numWalls });
            }
        }
    }
    
    handleMouseLeave(row, col){
        if(!this.state.running){
            if(this.state.dragging === "startNode" || this.state.dragging === "finishNode"){
                if(this.state.isPathDrawn){
                    clearPath(this);
                }
                const newGrid = getNodeUpdatedGrid(this.state.grid, row, col, "default");
                this.setState({ grid: newGrid });
            }
        }
    }

    handleMouseUp(row, col) {
        if(!this.state.running){
            if(this.state.dragging === "startNode"){
                const newGrid = getNodeUpdatedGrid(this.state.grid, row, col, "startNode");
                this.setState({ grid: newGrid, dragging: "", startNodeCoords: [row, col] });
            } else if(this.state.dragging === "finishNode") {
                const newGrid = getNodeUpdatedGrid(this.state.grid, row, col, "finishNode");
                this.setState({ grid: newGrid, dragging: "", finishNodeCoords: [row, col] });
                
            }
        }
        this.setState({ dragging: "" });
    }

    randomizeStartFinishNodes() {
        var {grid, startNodeCoords, finishNodeCoords } = this.state;
        
        grid[startNodeCoords[0]][startNodeCoords[1]] = createNode(startNodeCoords[0], startNodeCoords[1], "default", Infinity);
        grid[finishNodeCoords[0]][finishNodeCoords[1]] = createNode(finishNodeCoords[0], finishNodeCoords[1], "default", Infinity);
        
        var emptyNodes = [];
        // Get all empty nodes
        for(var row of grid){
            var newRow = row.filter(node => node.type === "default");
            if(newRow.length > 0) emptyNodes.push(newRow);
        }

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

    render() {
        const {grid, startNodeCoords, finishNodeCoords, runTimeSeconds, numNodesInPath, numVisitedNodes, numWalls, lastAlgoRunString} = this.state;

        return (
            <div>
                <div className='menu'>
                    <h1 className='title'>Pathfinding Visualizer</h1>
                    <div className='menu-group-container'>
                        <div className='menu-group'>
                            <h2>Pathfinding</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeDijkstra(this, grid, startNodeCoords, finishNodeCoords)}>Dijkstra's Algorithm</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeAStar(this, grid, startNodeCoords, finishNodeCoords)}>A*</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeDFS(this, grid, startNodeCoords, finishNodeCoords)}>DFS</button>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeBFS(this, grid, startNodeCoords, finishNodeCoords)}>BFS</button>
                        </div>
                        <div className='menu-group'>
                            <h2>Generators</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeRecursiveDivision(this, grid, startNodeCoords, finishNodeCoords)}>Recursive Division</button>
                        </div>
                        <div className='menu-group'>
                            <h2>Board Options</h2>
                            <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> resetGrid(this)}>Clear Walls</button>
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
                                        const { row, col, type, distance } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                className='node'
                                                row={row}
                                                col={col}
                                                type={type}
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

function getNodeUpdatedGrid(grid, row, col, type) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        type
    };
    newGrid[row][col] = newNode;
    return newGrid;
}