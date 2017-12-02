import React, { Component } from 'react';
import '../Main.css';

class ContentRight extends Component {
  render() {
    return (
      <div class="col2">
        <div class="chat">
          <div class="header">
              <div>
                  <h1>Souvik Sen</h1>
                  <h2>High Priority</h2>
              </div>
              <button><a href="#">Mark as resolved</a></button>
          </div>
          <div class="divider"></div>
          <div class="customer">od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice.I contacted Flipkart cc and their standard answer was your order will be delivered within 7 pm today.</div>
          
          <div class="company">Hi! We are looking into the issue, we’ll get back to you shortly. Thank you for contacting</div>
          
          <div class="company">Here’s your unique tracking link, follow the updates here: https://assist.ly/bxgP12</div>
          
          <div class="send">
              <input type="text"/>
              <img src={require("../assets/send.svg")}></img>
        </div>
        </div>
      </div>
    );
  }
}

export default ContentRight;
