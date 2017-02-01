import React, {Component} from 'react';
// import * as actions from '../actions';

class Space extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderUserSpace = this.renderUserSpace.bind(this);
        this.renderStyle = this.renderStyle.bind(this);
    }

    handleClick() {
        let {y, x, space} = this.props;
        if (!space.attacked) {

            this.props.hitSpace([y, x]);
            // this.props.attackShip();
        }
    }

    renderUserSpace() {
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
        let renderFnc = (this.props.owner === 'user') ? this.renderUserSpace : '';
        let style = this.renderStyle();
        return(
            <div className="space" style={style} onClick={this.handleClick.bind(this)}>
                {renderFnc()}
            </div>
        );
    }
}

export default Space;