import React, {Component} from 'react';
// import * as actions from '../actions';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    renderRows() {
        let rows = [];
        for (let i = 0; i <= 9; i++) {
            rows.push(
                // this.props.board[0];
                <Row row={i} />
            );
        }
    }

    render() {
        return(
            <div className="board">
                {this.renderRows()}
            </div>
        );
    }
}

export default Board;