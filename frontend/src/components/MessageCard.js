import React, { Component } from 'react';
import '../Main.css';

export default class MessageCard extends Component {
  constructor(props){
      super(props)
      this.state = {
          conversations: []
        }
  }

  componentDidMount(){
      this.setState({
        conversations: this.props.conversations
        })
  }
  render() {
    return (
            <div>
            {this.state.conversations.map((elm,i) => 
                <div key={i} className={elm.author}>{elm.body}</div>)
            }  
            </div>
          
    );
  }
}


