import React, {Component} from 'react';
import './Legend.css';
import '../Node/Node.css';

export default class Legend extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {} = this.props;

        return (
            <div id='legend-component' className="legend-component">
                        <p className="legend-item"><div className='node node-start'></div><b> Start</b></p>
                        <p className="legend-item"><div className='node node-finish'></div><b> Finish</b></p>
                        <p className="legend-item"><div className='node node-wall'></div><b> Wall</b></p>
                        <p className="legend-item"><div className='node node-visited node-legend'></div><b> Visited</b></p>
                        <p className="legend-item"><div className='node node-shortest-path node-legend'></div><b> Path</b></p>
                        <p className="legend-item"><div className='node node-current node-legend'></div><b> Current</b></p>
                        <p className="legend-item"><div className='node node-legend'></div><b> Unvisited</b></p>
                    </div>
        );
    }
}


