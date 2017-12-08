import React, { Component } from 'react';
import '../Main.css';

export default class Issues extends Component {
  render() {
    return (
        <div className={this.props.status}>
            <div className="header">
                <div>
                    <h1>{this.props.author}</h1>
                </div>
                <div className="bro">
                    <div className="status">
                        <div>{this.props.type}</div>
                     </div>   
                    <div className="media">{this.props.media}</div>
                </div>
            </div>
            <p>{this.props.payload}</p>
        </div>
    );
  }
}

