import React, { Component } from 'react';
import '../Main.css';
import {server} from './../env'
import MessageCard from './MessageCard'

class ContentRight extends Component {
  constructor(props){
    super(props)
    this.state = {
      "issue_info": {
        "issue_id": 8,
        "page_id": "140812149910489", 
        "post_id": "140980146560356", 
        "created_at": "2017-12-07T15:12:48.147Z", 
        "updated_at": "2017-12-07T15:12:48.147Z", 
        "category": "support complains", 
        "url": "https://www.facebook.com/140812149910489/posts/140980146560356?comment_id=142059616452409"
      },
      "conversations": [
        {"id": 11, 
         "message": "I have had Prime for years, and have had no problems with it until Amazon started doing their own deliveries via AMZL. I can no longer count on timely deliveries.", 
         "created_at": "07 Dec, 03:12 PM", 
         "who_sent_it": "company",
         "sender": "Public Facing Organisation",
         "comment_id": "142059616452409", 
         "page_id": "140812149910489", 
         "post_id": "140980146560356"
        }, 
        {"id": 13, 
         "message": "Fuck you", 
         "created_at": "07 Dec, 03:13 PM", 
         "sender": "", 
         "who_sent_it": "customer",
         "comment_id": "142059706452400", 
         "page_id": "140812149910489", 
         "post_id": "140980146560356"
        }
      ]
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
        { this.props.issue }
          <div className="header">
              <div>
                  <h1>{this.props.user}</h1>
                  <h2>{this.props.priority}</h2>
              </div>
              <button><a href="">Mark as resolved</a></button>
          </div>
          <div className="divider"></div>
          <MessageCard clientName={this.props.clientName} conversations = {this.state.conversations}/>
          
          <div className="send">
              <input type="text"/>
              <img src={require("../assets/send.svg")} alt="Send"></img>
        </div>
        </div>
      </div>
    );
  }
}

export default ContentRight;
