import React, {Component} from 'react';
import Node from './Node/Node';

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
            isPathDrawn: false
        };
    }

    componentDidMount(){
        const grid = getInitialGrid(this);
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        var type = this.state.grid[row][col].type;
        if(!this.state.running){
            if(type === "startNode") {
                this.setState({ dragging: "startNode" });
            } else if(type === "finishNode"){
                this.setState({ dragging: "finishNode" });
            } else {
                const newGrid = getWallUpdatedGrid(this.state.grid, row, col);
                this.setState({ grid: newGrid, dragging: "wallNode" });
            }
        }
    }
    
    handleMouseEnter(row, col) {
        const enteredNodeType = this.state.grid[row][col].type;
        var newGrid = this.state.grid;

        if(!this.state.dragging === "") return;
        if(!this.state.running){
            if(this.state.dragging === "startNode"){
                if(enteredNodeType === "finishNode"){
                    const randomEmptyNodeCoords = getRandomEmptyNodeCoords(this);
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "finishNode");
                    this.setState({ finishNodeCoords: randomEmptyNodeCoords });
                }
                newGrid = getNodeUpdatedGrid(newGrid, row, col, "startNode");
                this.setState({ grid: newGrid });
            } else if(this.state.dragging === "finishNode") {
                if(enteredNodeType === "startNode"){
                    const randomEmptyNodeCoords = getRandomEmptyNodeCoords(this);
                    newGrid = getNodeUpdatedGrid(newGrid, randomEmptyNodeCoords[0], randomEmptyNodeCoords[1], "startNode");
                    this.setState({ startNodeCoords: randomEmptyNodeCoords });
                }
                newGrid = getNodeUpdatedGrid(newGrid, row, col, "finishNode");
                this.setState({ grid: newGrid });

            } else if(this.state.dragging === "wallNode") {
                newGrid = getWallUpdatedGrid(newGrid, row, col);
                this.setState({ grid: newGrid });
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
        const {grid, startNodeCoords, finishNodeCoords} = this.state;

        return (
            <div>
                <h1>Pathfinding Visualizer</h1>
                <div className='menu'>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeDijkstra(this, grid, startNodeCoords, finishNodeCoords)}>Dijkstra's Algorithm</button>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeAStar(this, grid, startNodeCoords, finishNodeCoords)}>A*</button>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeDFS(this, grid, startNodeCoords, finishNodeCoords)}>DFS</button>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeBFS(this, grid, startNodeCoords, finishNodeCoords)}>BFS</button>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={() => visualizeRecursiveDivision(this, grid, startNodeCoords, finishNodeCoords)}>Recursive Division</button>
                </div>
                <div className='menu'>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> resetGrid(this)}>Clear Walls</button>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> clearPath(this)}>Clear Path</button>
                    <button className="btn btn-outline-dark" disabled={this.state.running} onClick={()=> clearPath(this, this.randomizeStartFinishNodes)}>Randomize Start and End Nodes</button>
                </div>

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
                                        >
                                        </Node>);
                                })}
                            </div>
                        );
                    })}
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