import React, {Component} from 'react';
// import * as actions from '../actions';

class Space extends Component {
    constructor(props) {
        super(props);
    }

    renderValue() {
        if (this.props.value === 'destroyer') {
            return "DDD";
        }
    }
    
    render() {
        return(
            <div className="space">
                {this.renderValue()}
            </div>
        );
    }
}

export default Space;