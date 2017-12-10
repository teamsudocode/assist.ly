import React, { Component } from 'react';
import '../Main.css';
import {server} from './../env'
import MessageCard from './MessageCard'

class ContentRight extends Component {
  constructor(props){
    super(props)
    this.state = {
      issue_info: undefined,
      conversations: undefined
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.issue === undefined) {
      console.log('contentRight', 'issue is still undefined')
      return false
    }
    console.log('rebuilding content right for', newProps.issue)
    fetch(server+'/api/conversations?issue_id=' + newProps.issue)
      .then(res => res.json())
      .then((res) => {
        console.log('res from conversations link', res)
        console.log(res.issue_info)
        console.log(res.conversations)
        this.setState({issue_info: res.issue_info, conversations: res.conversations})
      });
  }


  markAsResolved() {
    console.log('marking as resolved for issue', this.state.issue_info.id)
    let url = server + '/api/change_status?issue_id='+this.state.issue_info.id+'&status=2'
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      console.log('changed status')
      document.getElementById("mid-issue-"+this.state.issue_info.id).remove()
    })
  }


  sendMessage() {
    // get message to be sent
    // make a post request to the server
    console.log('sending message to the server:', this.messageInput.value)
    let url = server + '/api/issue/'+this.state.issue_info.id+'/respond?message='+this.messageInput.value+'&notify=yes'
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log('sent message to facebook')
    })
  }


  render() {
    console.log('rendering contentright with state', this.state)
    console.log(this.state.issue_info, this.state.conversations)
    
    if (this.state.issue_info === undefined || this.state.conversations === undefined)
      return null


    return (
      <div className="col2">
        <div className="chat">
          <div className="header">
              <div style={{marginLeft: 0}}>
                <h1 title='Link to issue creator'>
                  <a href={this.state.issue_info.sender_url}>
                    {this.state.issue_info.sender_name}
                  </a>
                </h1>
                  <h2 title='Issue priority'>{this.state.issue_info.priority}</h2>
              </div>
              <button onClick={() => this.markAsResolved()}><a href="">Mark as resolved</a></button>
          </div>
          <div className="divider"></div>
          <MessageCard clientName={this.props.clientName} conversations = {this.state.conversations}/>
          
          <div className="send">
              <input type="text" 
                     ref={ (input) => { this.messageInput=input } } 
                     onKeyPress={(e) => { if (e.key === 'Enter') this.sendMessage() } }/>
              <img src={require("../assets/send.svg")} alt="Send" onClick={() => { this.sendMessage() } }></img>
        </div>
        </div>
      </div>
    );
  }
}

export default ContentRight;
