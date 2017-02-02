import React, {Component} from 'react';
// import * as actions from '../actions';

class Space extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.revealUserSpace = this.revealUserSpace.bind(this);
        this.renderStyle = this.renderStyle.bind(this);
    }

    handleClick() {
        debugger;
        if (this.props.turn === 1) return;
        let {y, x, space} = this.props;
        if (!space.attacked) {

            this.props.hitSpace([y, x]);
            // this.props.switchTurn();
            // this.props.attackShip();
        }
    }

    revealUserSpace() {
        // debugger;
        if (this.props.space.ship !== 'blank') {
            return this.props.space.ship;
        }
    }

    renderStyle() {
        // let style;
        // if (this.props.game.turn === 0) style = {};
        if (this.props.space.attacked) {
            if (this.props.space.ship === 'blank') {
                return {backgroundColor: 'green'};
            } else {
                return {backgroundColor: 'red'};
            }
        } else {
                return {};
        }
    }    

    
    render() {
        let style = this.renderStyle();
        return(
            <div className="space" style={style} onClick={this.handleClick.bind(this)}>
                {(this.props.owner === 'user') ? this.revealUserSpace() : ''}
            </div>
        );
    }
}

export default Space;