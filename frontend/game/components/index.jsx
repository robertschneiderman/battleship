import React, {Component} from 'react';
import {connect} from 'react-redux';
import Board from './board';
// import * as actions from '../actions';

class Game extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {playerBoard} = this.props;
                // <Board owner={'user'} board={boards[0]} />
                // <Board owner={'computer'} board={boards[1]} />
        return(
            <div className="game">
                <Board board={playerBoard} />
            </div>
        );
                // <Board />
    }
}

let rows = [];
for (let i = 1; i <= 10; i++) {
    rows.push([]);

    for (let j = 1; j <= 10; j++) {
        let row = rows[rows.length-1];
        row.push('blank');
    }
}

rows[0][1] = 'destroyer';
rows[0][2] = 'destroyer';

// const populateBoard = () => {
//     spaces.forEach();
// };


const mapStateToProps = state => {
    // attacked
    // blank
    // miss
    // hit
    // boat-names ...

    let playerBoard = {
        spaces: rows,
        ships: [
            {
                name: 'Destroyer',
                capacity: 2,
                hits: 0
            }
        ]
    };

    return {
        playerBoard
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);