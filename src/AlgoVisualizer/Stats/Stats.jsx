import React, {Component} from 'react';

import './Stats.css';

export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            lastAlgoRunString,
            runTimeSeconds,
            numNodesInPath,
            numVisitedNodes,
            numWalls
        } = this.props;

        return (
            <div id='stats-component' className="stats-component">
                        <p className="stat"><b>Last Algorithm Run: </b> {lastAlgoRunString}</p>
                        <p className="stat"><b>Calculation Time: </b> {runTimeSeconds}ms</p>
                        <p className="stat"><b>Nodes in Path:</b> {numNodesInPath}</p>
                        <p className="stat"><b>Nodes Visited:</b> {numVisitedNodes}</p>
                        <p className="stat"><b>Walls:</b> {numWalls}</p>
                    </div>
        );
    }
}


