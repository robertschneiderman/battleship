import React, {Component} from 'react';
import Space from './space';
// import * as actions from '../actions';

class Row extends Component {
    constructor(props) {
        super(props);
    }

    renderSpaces() {
        let spaces = [];
        for (let i = 1; i <= 10; i++) {
            spaces.push(
                // this.props.board[y];                
                <Space y={this.props.y} x={i} />
            );
        }
        return spaces;
    }

    render() {
        return(
            <div className="row">
                {this.renderSpaces()}
            </div>
        );
    }
}

export default Row;