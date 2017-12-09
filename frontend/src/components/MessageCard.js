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
            {this.state.conversations.map((each,i) => 
                <div key={i} id={each.id} className={each.who_sent_it}>{each.message}</div>
              )
            }  
            </div>
          
    );
  }
}


