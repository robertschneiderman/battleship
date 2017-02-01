import React, {Component} from 'react';
import Space from './space';
// import * as actions from '../actions';

class Row extends Component {
    constructor(props) {
        super(props);
    }

    renderSpaces() {
        let spaces = [];
        let {owner, y, hitSpace} = this.props;
        for (let i = 0; i <= 9; i++) {
            let space = this.props.row[i];                
            spaces.push(
                <Space owner={owner} space={space} y={y} x={i} hitSpace={hitSpace} />
            );
        }
        return spaces;
    }

    render() {
        return(
            <div className="row">
                {this.renderSpaces()}
            </div>
        );
    }
}

export default Row;