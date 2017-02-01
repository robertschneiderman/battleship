import React, {Component} from 'react';
import Row from './row';
// import * as actions from '../actions';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    renderRows() {
        let rows = [];
        let {hitSpace, owner} = this.props;
        for (let i = 0; i <= 9; i++) {
            // debugger;
            let row = this.props.board.spaces[i];
            rows.push(
                <Row {...this.props} row={row} y={i} />
            );
        }
        return rows;
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