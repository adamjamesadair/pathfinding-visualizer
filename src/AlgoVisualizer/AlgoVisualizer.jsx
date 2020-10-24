import React, {Component} from 'react';
import Node from './Node/Node';

import {computeDijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstra';
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

    clearPath() {
        // TODO
        // const {grid} = this.state;
        // const newGrid = grid.slice();
        // const node = newGrid[row][col];
        // const newNode = {
        //     ...node,
        //     distance: Infinity,
        //     isVisited: false,
        // };
        // newGrid[row][col] = newNode;
        // grid = newGrid;
        // this.setState({ grid });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                document.getElementById(`node-${node.row}-${node.col}`).className + ' node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 
            document.getElementById(`node-${node.row}-${node.col}`).className + ' node-shortest-path';
        }, 50 * i);
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const {startNodeCoords} = this.state;
        const {finishNodeCoords} = this.state;

        const visitedNodesInOrder = computeDijkstra(grid, startNodeCoords, finishNodeCoords);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeCoords[0]][finishNodeCoords[1]]);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    } 

    resetGrid() {
        var {grid} = this.state;
        const {startNodeCoords} = this.state;
        const {finishNodeCoords} = this.state;

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
        this.setState({ grid });
    }

    render() {
        const {grid} = this.state;

        return (
            <div>
                <h1>Pathfinding Visualizer</h1>
                <button onClick={() => this.visualizeDijkstra()}>Dijkstra's Algorithm</button>
                <button onClick={()=> this.resetGrid()}>Reset</button>
                <button onClick={()=> this.clearPath()}>Clear Path</button>
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
            currentRow.push(createNode(row, col, "default", Infinity))
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

function createNode(row, col, type, distance) {
    return {
        row,
        col,
        type,
        distance,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

function getWallUpdatedGrid(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        type: node.type == "wallNode" ? "default" : node.type == "default" ? "wallNode" : node.type
    };
    newGrid[row][col] = newNode;
    return newGrid;
}
