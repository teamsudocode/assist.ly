import React, { Component } from 'react';
import '../style.css';

import Card from './Card' 

class Body extends Component {
    _renderCard = (i,data) => {
        
        if(i%2===0){
            return(<Card align = {"card left"} time = {data.time} load = {data.load}/>)
        }
        else{
            return(<Card align = {"card right"} time = {data.time} load = {data.load}/>)
            
        }
    }
    
    render() {
        return (
            <div className="view">
                <div className="col0">
                    <h1>Ticket Number</h1>
                    <h2>{this.props.ticket_no}</h2>
                </div>
                <div className="col1">
                    {this.props.data.map((item,i) => this._renderCard(i,item))}
                 </div>
                 <div className="col2"><button><a href={this.props.href}>View Original Post</a></button></div>
            </div>
        );
    }
}

export default Body;
