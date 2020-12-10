import React, {Component} from 'react';
import './TutorialModal.css';
import location from '../../media/tutorial_media/location.png';
import location_green from '../../media/tutorial_media/location_green.png';
import drawWall from '../../media/tutorial_media/draw_wall.gif';
import drawWeight from '../../media/tutorial_media/draw_weight.gif';
import helpBtn from '../../media/tutorial_media/help_btn.JPG';
import boardOptions from '../../media/tutorial_media/board_options.JPG';
import dijkstra from '../../media/tutorial_media/dijkstra.gif';
import recursiveDivision from '../../media/tutorial_media/recursive_division.gif';
import addCheckpoint from '../../media/tutorial_media/add_checkpoint.gif';
import dragNodes from '../../media/tutorial_media/drag_nodes.gif';

export default class TutorialModal extends Component {
    constructor(props) {
        super(props);
                this.state = {
                    pages: 
                        {
                        page_1: 
                            <div>
                                <h1>Pathfinding Visualizer Tutorial</h1>
                                <h2>There are many pathfinding algorithms out there to explore.</h2>
                                <p>This application hopes to provides a playground to explore and understand a few of these pathfinding algorithms.</p>
                                <img className="location-icon-img" src={location_green} alt="Image of a location icon."/>
                                <img className="location-icon-img" src={location} alt="Image of a location icon."/>
                                <p>For a  brief walkthrough of how to use this application, click the <b><i>Next</i></b> button in the bottom right. To skip the tutorial at any time, click the <b><i>Skip Tutorial</i></b> button in the bottom left. </p>
                            </div>,
                        page_2: 
                            <div>
                                <h1>What is pathfinding?</h1>
                                <h2>The objective pathfinding algorithms is to find a path between two or more points.</h2>
                                <p>Some pathfinding algorithms aim to find the shortest path while others are satisfied with any path. Some pathfinding algorithms called <b><i>weighted</i></b> algorithms take the "cost" of moving from one node to another into consideration while <b><i>unweighted</i></b> algorithms do not. There are many pathfinding algorithms out there to explore. This application hopes to provides a playground to explore and understand a few of these pathfinding algorithms.</p>
                            </div>,
                        page_3: 
                            <div>
                                <h1>Visualizing Algorithms</h1>
                                <h2>Click the algorithms in the pathfinding section to visualize an algorithm.</h2>
                                <p>In this application, each space(node) in the grid has a cost of 1. The algorithms in the <b><i>weighted</i></b> section consider this cost when pathfinding. Algorithms in the <b><i>unweighted</i></b> section do not.</p>
                                <img className="visualize-algorithms-gif" src={dijkstra} alt="Gif of Dijkstra's algorithm running."/>
                            </div>,
                        page_4: 
                            <div>
                                <h1>Algorithms</h1>
                                <div className="algorithm-category">
                                    <h3>Weighted Algorithms</h3>
                                    <p><b>Dijkstra's Algorithm: </b> This algorithm guarantees the shortest path.</p>
                                    <p><b>A*: </b> A best-first search that makes use of a heuristic to determine the next node to visit. For this application, the heuristic is <b>manhattan distance</b>. This algorithm guarantees the shortest path.</p>
                                </div>
                                <div className="algorithm-category">
                                    <h3>Unweighted Algorithms</h3>
                                    <p><b>Depth-First Search (DFS): </b> Bad for pathfinding, depth-first search explores as far as possible on a single path, backtracking when a deadend is reached. This algorithm does <b>not</b> guarantee the shortest path.</p>
                                    <p><b>Bredth-First Search (BFS): </b> Good for pathfinding, breadth-first search explores all of the neighbor nodes, then their neighbors level by level. This algorithm guarantees the shortest path.</p>
                                </div>
                            </div>,
                        page_5: 
                            <div>
                                <h1>Drawing Walls</h1>
                                <h2>Click and drag on the grid to draw wall nodes. Clicking or draging over a wall node will return it to an empty node.</h2>
                                <p>Walls are impenetrable. This means that a path cannot pass through a wall node. </p>
                                <img src={drawWall} alt="Gif of drawing walls on the grid."/>
                            </div>,
                        page_6: 
                            <div>
                                <h1>Drawing Weights</h1>
                                <h2>Click the <b><i>Draw: Wall</i></b> button to toggle between drawing wall and weight nodes. </h2>
                                <p>The current type of node to be drawn is displayed after the ":". Paths can pass through weight nodes, but at a higher cost. By default, the cost to pass through a weight node is 5 and an empty space is 1. Remember that not all algorithms take weight into account when pathfinding.</p>
                                <img className="drawing-weights-gif" src={drawWeight} alt="Gif of drawing weights on the grid."/>
                            </div>,
                        page_7: 
                            <div>
                                <h1>Adding Checkpoints</h1>
                                <h2>Click the <b><i>Add Checkpoint</i></b> button to add a checkpoint to the grid.</h2>
                                <p>Checkpoints are nodes that must be visited in order before reaching the finish node. If any checkpoint node is unreachable, then there is no path.</p>
                                <img className="adding-checkpoints-gif" src={addCheckpoint} alt="Gif of adding checkpoints to the grid."/>
                            </div>,
                        page_8: 
                            <div>
                                <h1>Dragging Nodes</h1>
                                <h2>The start node, finish node and checkpoint nodes can be dragged to new locations.</h2>
                                <p>Dragging one of the nodes mentioned above over another node above will cause the node to jump to a random open space. Dragging over walls or weights will remove the wall or weight.</p>
                                <img className="dragging-nodes-gif" src={dragNodes} alt="Gif of dragging nodes."/>
                            </div>,
                        page_9: 
                            <div>
                                <h1>Generating mazes</h1>
                                <h2>Click the button in the <b><i>Generators</i></b> section to generate a maze</h2>
                                <img className="generators-gif" src={recursiveDivision} alt="Gif of recursive division generating a maze."/>
                            </div>,
                        page_10: 
                            <div>
                                <h1>Board Options</h1>
                                <h2>Clear the board, clear the path and visited nodes or randomize the start and finish node locations with the buttons in the nav bar.</h2>
                                <img className="board-options-img" src={boardOptions} alt="Imgage of board options."/>
                            </div>,
                        page_11: 
                            <div>
                                <h1>Help</h1>
                                <h2>Click the help button to view this tutorial again.</h2>
                                <img className="help-btn-img" src={helpBtn} alt="Image of the help button."/>
                            </div>
                        }
                    };
    }

    render() {
        const { show, pageNum, onBack, onNext, onHide } = this.props;
        const numPages = Object.keys(this.state.pages).length;

        if(!show) {
            return <div></div>;
        }

        return (
            <div className="tutorial-modal">
                <p className="page-number">{pageNum}/{Object.keys(this.state.pages).length}</p>
                {this.state.pages["page_" + pageNum]}
                <button className="close-btn btn btn-outline-dark" onClick={() => onHide()}>Skip Tutorial</button>
                <div className="navigation-btn-container">
                    <button className={pageNum === 1 ? "hidden" : "back-btn btn btn-outline-dark" } onClick={() => onBack()}>Back</button>
                    <button className={"next-btn btn btn-outline-dark"} onClick={() => pageNum === numPages ? onHide() : onNext() }>{pageNum === numPages ? "Finish" : "Next"}</button>
                </div>
            </div>
        );
    }
}


