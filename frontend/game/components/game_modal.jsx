import React, {Component} from 'react';
import * as actions from '../actions';
import ReactDOM from 'react-dom';

import Modal from 'react-modal';

class GameModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Modal className="game-modal" isOpen={true}>
                <h1 className="game-modal-title">{this.props.winner} Won!!!!!</h1>
                <button className="game-modal-btn">Play Again!</button>
            </Modal>
        );
    }
}

export default GameModal;