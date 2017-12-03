import React, { Component } from 'react';
// import './App.css';

import Header from './components/Header'
import Body from './components/Body'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ticket_no: "1234",
      user: "NAmewa Hiro",
      data: [
        {time: "11:22 AM", load: "You messaged od110510389196784000 the ordered product didnt deliver to me and the delivery boy…"},
        {time: "11:22 AM", load: "You messaged od110510389196784000 the ordered product didnt deliver to me and the delivery boy…"},
        {time: "11:22 AM", load: "You messaged od110510389196784000 the ordered product didnt deliver to me and the delivery boy…"},
        {time: "11:22 AM", load: "You messaged od110510389196784000 the ordered product didnt deliver to me and the delivery boy…"},
        {time: "11:22 AM", load: "You messaged od110510389196784000 the ordered product didnt deliver to me and the delivery boy…"} 
      ],
      href: "www.google.com",
    }

  }
  render() {
    return (
      <div className="App">
        <Header/>
        <Body ticket_no = {this.state.ticket_no} data = {this.state.data} href = {this.state.href}/>
      </div>
    );
  }
}

export default App;
