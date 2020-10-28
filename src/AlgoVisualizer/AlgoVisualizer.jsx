import React, {Component} from 'react';
import Node from './Node/Node';

import {visualizeDijkstra} from '../Algorithms/dijkstra';
import {visualizeAStar} from '../Algorithms/aStar';
import {visualizeDFS} from '../Algorithms/dfs';
import {visualizeBFS} from '../Algorithms/bfs';
import {clearPath, createNode} from '../Algorithms/helpers';
import './AlgoVisualizer.css';  

export default class AlgoVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            startNodeCoords: [5, 10],
            finishNodeCoords: [7, 40],
            mouseIsPressed: false
        };
    }

    componentDidMount(){
        const grid = getInitialGrid(this.state);
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const newGrid = getWallUpdatedGrid(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getWallUpdatedGrid(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }
    
    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }
    
    resetGrid(callback) {
        var {grid, startNodeCoords, finishNodeCoords} = this.state;

        // reset node classnames
        for (const row of grid) {
            for (const node of row) {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            }
        }

        // set start and finish node classnames
        document.getElementById(`node-${startNodeCoords[0]}-${startNodeCoords[1]}`).className = 'node node-start';
        document.getElementById(`node-${finishNodeCoords[0]}-${finishNodeCoords[1]}`).className = 'node node-finish';
        grid = getInitialGrid(this.state);
        this.setState({ grid }, callback);
    }

    randomizeStartFinishNodes() {
        var {grid, startNodeCoords, finishNodeCoords } = this.state;
        
        grid[startNodeCoords[0]][startNodeCoords[1]] = createNode(startNodeCoords[0], startNodeCoords[1], "default", Infinity);
        grid[finishNodeCoords[0]][finishNodeCoords[1]] = createNode(finishNodeCoords[0], finishNodeCoords[1], "default", Infinity);
        
        startNodeCoords = [randomInteger(0, grid.length - 1), randomInteger(0, grid[0].length - 1)];
        finishNodeCoords = [randomInteger(0, grid.length - 1), randomInteger(0, grid[0].length - 1)];
        
        grid[startNodeCoords[0]][startNodeCoords[1]] = createNode(startNodeCoords[0], startNodeCoords[1], "startNode", 0);
        grid[finishNodeCoords[0]][finishNodeCoords[1]] = createNode(finishNodeCoords[0], finishNodeCoords[1], "finishNode", Infinity);
        
        this.setState({ grid, startNodeCoords, finishNodeCoords });
    }

    render() {
        const {grid, startNodeCoords, finishNodeCoords} = this.state;

        return (
            <div>
                <h1>Pathfinding Visualizer</h1>
                <div className='menu'>
                    <button className="btn btn-outline-dark" onClick={() => visualizeDijkstra(this, grid, startNodeCoords, finishNodeCoords)}>Dijkstra's Algorithm</button>
                    <button className="btn btn-outline-dark" onClick={() => visualizeAStar(this, grid, startNodeCoords, finishNodeCoords)}>A*</button>
                    <button className="btn btn-outline-dark" onClick={() => visualizeDFS(this, grid, startNodeCoords, finishNodeCoords)}>DFS</button>
                    <button className="btn btn-outline-dark" onClick={() => visualizeBFS(this, grid, startNodeCoords, finishNodeCoords)}>BFS</button>
                </div>
                <div className='menu'>
                    <button className="btn btn-outline-dark" onClick={()=> this.resetGrid()}>Reset</button>
                    <button className="btn btn-outline-dark" onClick={()=> clearPath(this)}>Clear Path</button>
                    <button className="btn btn-outline-dark" onClick={()=> this.resetGrid(this.randomizeStartFinishNodes)}>Randomize Start and End Nodes</button>
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
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
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

const getInitialGrid = (state) => {
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
    const [startRow, startCol] = state.startNodeCoords;
    const [finishRow, finishCol] = state.finishNodeCoords;
    grid[startRow][startCol] = createNode(startRow, startCol, "startNode", 0);
    grid[finishRow][finishCol] = createNode(finishRow, finishCol, "finishNode", Infinity);
    return grid;
};

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

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}