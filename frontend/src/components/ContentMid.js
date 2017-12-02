import React, { Component } from 'react';
import '../Main.css';
import Issues from './Issues'

export default class ContentMid extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [{author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 2, },
             {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 10  },
             {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 9 },
             {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 7 },
             {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 3 }
            ]
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="col1">
        <div className="tickets">
          {this.state.data.map((elm,i) => <Issues key ={i} payload = {elm.payload} author = {elm.author} type = {elm.type} media = {elm.media}/>)}
        </div>
      </div>
    );
  }
}

