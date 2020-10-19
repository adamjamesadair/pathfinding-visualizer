import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            row,
            col,
            type,
            onMouseDown,
            onMouseEnter,
            onMouseUp
        } = this.props;

        const typeClass = type == "finishNode"
            ? 'node-finish'
            : type == "startNode"
            ? 'node-start'
            : type == "wallNode"
            ? 'node-wall'
            : '';

        return (
            <div 
                id={`node-${row}-${col}`}
                className = {`node ${typeClass}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        );
    }
}


