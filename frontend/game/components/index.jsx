import React, {Component} from 'react';
import {connect} from 'react-redux';
import Board from './board';
import * as actions from '../actions';

class Game extends Component {
    constructor(props) {
        super(props);
        this.aiMove = this.aiMove.bind(this);
    }

    formulateMove(board) {
        let lastMove = this.props.moves[this.props.moves.length-1];
        if ( === 'hit') {

        }

        this.props.aiMove(move);
    }

    render() {
        let {boards, hitSpace} = this.props;
        if (this.props.move === 1) this.formulateMove(boards[0]);
                // <Board owner={'user'} board={boards[0]} />
                // <Board owner={'computer'} board={boards[1]} />
        return(
            <div className="game">
                <Board owner={'user'} {...this.props} board={boards[0]} />
                <Board owner={'opponent'} {...this.props} board={boards[1]} />
            </div>
        );
    }
}

// const populateBoard = () => {
//     spaces.forEach();
// };


const mapStateToProps = state => {
    // attacked
    // unattacked

    // empty
    // boat-names ...

    // miss
    // hit    

    let {game} = state;

    return {
        game: game.game,
        boards: game.boards
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
    hitSpace: (payload) => dispatch(actions.hitSpace(payload)),
    switchTurn: (payload) => dispatch(actions.switchTurn(payload)),
    aiMove: (payload) => dispatch(actions.aiMove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);