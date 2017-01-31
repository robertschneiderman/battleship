import React, {Component} from 'react';
// import * as actions from '../actions';

class Row extends Component {
    constructor(props) {
        super(props);
    }

    renderSpaces() {
        let rows = [];
        for (let i = 1; i <= 10; i++) {
            rows.push(
                // this.props.board[y];                
                <Space y={this.props.y} x={i} />
            );
        }
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