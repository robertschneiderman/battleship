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
            let row = this.props.board.grid[i];
            rows.push(
                <Row key={`row-${i}`} {...this.props} row={row} y={i} />
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