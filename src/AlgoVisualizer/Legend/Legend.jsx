import React, {Component} from 'react';
import './Legend.css';
import '../Node/Node.css';

export default class Legend extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id='legend-component' className="legend-component">
                        <div className='node node-start'></div><p className="legend-item"><b> Start</b></p>
                        <div className='node node-finish'></div><p className="legend-item"><b> Finish</b></p>
                        <div className='node node-wall'></div><p className="legend-item"><b> Wall</b></p>
                        <div className='node node-weight'><div className='node-center'></div></div><p className="legend-item"><b> Weight</b></p>
                        <div className='node node-visited node-legend'></div><p className="legend-item"><b> Visited</b></p>
                        <div className='node node-shortest-path node-legend'></div><p className="legend-item"><b> Path</b></p>
                        <div className='node node-current node-legend'></div><p className="legend-item"><b> Current</b></p>
                        <div className='node node-legend'></div><p className="legend-item"><b> Unvisited</b></p>
                        <div className='node node-checkpoint node-legend'></div><p className="legend-item"><b> Checkpoint</b></p>
                        <div className='node node-checkpoint node-current node-legend'></div><p className="legend-item"><b> Visited Checkpoint</b></p>
                    </div>
        );
    }
}


