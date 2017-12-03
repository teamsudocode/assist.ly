import React, { Component } from 'react';
import '../style.css';

class Card extends Component {
    render() {
        let align = this.props.align
        return (
            <div className={align}>
                <h4>{this.props.time}</h4>
                <p>{this.props.load}</p>
            </div>
        );
    }
}

export default Card;
