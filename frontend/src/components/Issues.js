import React, { Component } from 'react';
import '../Main.css';

export default class Issues extends Component {
  render() {
    let className = "ticket " + this.props.priority
    let div_id = "mid-issue-" + this.props.id
    return (
        <div id={div_id} className={className} onClick={this.props.clickHandler}>
            <div className="header">
                <div>
                    <h1>{this.props.sender_name}</h1>
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

