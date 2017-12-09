import React, { Component } from 'react';
import '../Main.css';

export default class MessageCard extends Component {
  constructor(props){
      super(props)
      this.state = {
          conversations: [
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

  componentWillReceiveProps(newProps){
      this.setState({
        conversations: newProps.conversations
      })
  }
  render() {
    if(this.state.conversations !== undefined){
      return (
        <div>
        {this.state.conversations.map((each,i) => 
            <div key={i} id={each.id} className={each.who_sent_it}>{each.message}</div>
          )
        }  
        </div>
      );
    }
      else{
        return (
          
              <div key={50} id={50} className="sender">No conversations</div>
            )
      }
    }
    
  }


