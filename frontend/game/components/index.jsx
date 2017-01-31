import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as actions from '../actions';

class Game extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // let {boards} = this.props;
                // <Board owner={'user'} board={boards[0]} />
                // <Board owner={'computer'} board={boards[1]} />
        return(
            <div className="game">
            </div>
        );
    }
}

const mapStateToProps = state => {
    // let {game } = state;
    // let { boards, ships };
        // boards,
        // ships
    return {
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);