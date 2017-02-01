import React, {Component} from 'react';
import {connect} from 'react-redux';
import Board from './board';
import * as actions from '../actions';

class Game extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {playerBoard, hitSpace} = this.props;
                // <Board owner={'user'} board={boards[0]} />
                // <Board owner={'computer'} board={boards[1]} />
        return(
            <div className="game">
                <Board owner={'user'}board={playerBoard} hitSpace={hitSpace} />
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
    let playerBoard = game.boards[0];

    return {
        playerBoard
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
    hitSpace: (payload) => dispatch(actions.hitSpace(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);