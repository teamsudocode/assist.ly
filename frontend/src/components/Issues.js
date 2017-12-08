import React, { Component } from 'react';
import '../Main.css';

export default class Issues extends Component {
  render() {
    return (
        <div className="ticket high">
            <div className="header">
                <div>
                    <h1>{this.props.sender}</h1>
                </div>
                <div className="bro">
                    <div className="status">
                        <div>{this.props.status}</div>
                     </div>   
                    <div className="media">{this.props.source}</div>
                </div>
            </div>
            <p>{this.props.message}</p>
        </div>
    );
  }
}

