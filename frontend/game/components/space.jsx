import React, {Component} from 'react';
// import * as actions from '../actions';

class Space extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        let {y, x, space} = this.props;
        if (!space.attacked) {

            this.props.hitSpace([y, x]);
            // this.props.attackShip();
        }
    }

    renderValue() {
        if (this.props.space.boat === 'destroyer' && !this.props.space.attacked) {
            return "DDD";
        } else if (this.props.space.boat !== 'blank' && this.props.space.attacked) {
            return 'ATTACKED!';
        }
    }
    
    render() {
        return(
            <div className="space" onClick={this.handleClick.bind(this)}>
                {this.renderValue()}
            </div>
        );
    }
}

export default Space;