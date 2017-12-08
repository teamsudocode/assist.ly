import React, { Component } from 'react';
import '../Main.css';
import {server} from './../env'
import MessageCard from './MessageCard'

class ContentRight extends Component {
  constructor(props){
    super(props)
    this.state = {
      conversations:[{author:"customer",body:"od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice.I contacted Flipkart cc and their standard answer was your order will be delivered within 7 pm today."},{author:"company",body:"od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice.I contacted Flipkart cc and their standard answer was your order will be delivered within 7 pm today."},{author:"customer",body:"od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice.I contacted Flipkart cc and their standard answer was your order will be delivered within 7 pm today."},{author:"company",body:"od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice.I contacted Flipkart cc and their standard answer was your order will be delivered within 7 pm today."},]
    }
  }

  componentDidMount() {
    fetch(server+'/api/issues?status=1')
      .then(res => res.json())
      .then((res) => {
        console.log(res)
      });
  }


  render() {
    return (
      <div className="col2">
        <div className="chat">
          <div className="header">
              <div>
                  <h1>{this.props.user}</h1>
                  <h2>{this.props.priority}</h2>
              </div>
              <button><a href="#">Mark as resolved</a></button>
          </div>
          <div className="divider"></div>
          <MessageCard conversations = {this.state.conversations}/>
          
          <div className="send">
              <input type="text"/>
              <img src={require("../assets/send.svg")}></img>
        </div>
        </div>
      </div>
    );
  }
}

export default ContentRight;
