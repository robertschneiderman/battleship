import React, {Component} from 'react';
// import * as actions from '../actions';

const lowerCase = (str) => {
    let arr = str.split(" ");
    arr = arr.map(word => word.slice(0, 1).toLowerCase() + word.slice(1));
    return arr.join("_");
};

class Space extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.revealUserSpace = this.revealUserSpace.bind(this);
        this.renderStyle = this.renderStyle.bind(this);
        this.renderMarker = this.renderMarker.bind(this);
    }

    handleClick() {
        if (this.props.turn === 1 || this.props.owner !== 'opponent') return;
        let {y, x, space} = this.props;
        if (!space.attacked) {

            this.props.hitSpace([y, x]);
            // this.props.switchTurn();
            // this.props.attackShip();
        }
    }

    getWidth(ship) {
        if (ship === 'Aircraft Carrier') return '500%';
        if (ship === 'Battleship') return '400%';
        if (ship === 'Destroyer') return '300%';
        if (ship === 'Submarine') return '300%';
        if (ship === 'Patrol Boat') return '200%';
    }

    revealUserSpace() {
        // debugger;
        let { space } = this.props;
        if (space.ship !== 'blank') {
            let src = `./images/${lowerCase(space.ship)}.svg`;
            let style = {};

            if (this.props.y === 5 && this.props.x === 4) debugger;
            if (space.vertical) {
                style.transform = 'rotate(90deg)';
                style.left = '100%';
                style.transformOrigin = '0% 0% 0';
            }
            style.width = `${this.getWidth(space.ship)}`;

            if (space.idx === 1) {
                return <img className="ship-img" src={src} style={style} />;
            }
        }
    }

    renderStyle() {
        // let style;
        // if (this.props.game.turn === 0) style = {};
        if (this.props.space.attacked) {
            if (this.props.space.ship === 'blank') {
                return {backgroundColor: '#41b5a5'};
            } else {
                return {backgroundColor: 'red'};
            }
        } else {
                return {};
        }
    }    

    renderMarker() {
        let style = this.renderStyle();        
        return (
            <div className="marker" style={style}></div>
        );
    }

    
    render() {
        return(
            <div className="space" onClick={this.handleClick.bind(this)}>
                {(this.props.owner === 'user') ? this.revealUserSpace() : ''}
                {this.props.space.attacked ? this.renderMarker() : ''}
            </div>
        );
    }
}

export default Space;