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
        let {y, x, space} = this.props;
        if (!space.attacked) {

            this.props.hitSpace([y, x]);
            // this.props.attackShip();
        }
    }

    revealUserSpace() {
        // debugger;
        if (this.props.space.boat !== 'blank') {
            return 'BOAT!';
        }
    }

    renderStyle() {
        // debugger;
        if (this.props.space.attacked) {
            if (this.props.space.boat === 'blank') {
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