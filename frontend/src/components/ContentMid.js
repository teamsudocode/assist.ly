import React, { Component } from 'react';
import '../Main.css';
import Issues from './Issues'
import {server} from './../env'


export default class ContentMid extends Component {
  constructor(props){
    super(props)
    // this.state = {
    //   data: [{sender_name: "souvik sen", priority: "high", status: "Open", source: "Facebook", message: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 2, },
    //          {sender_name: "souvik sen", priority: "medium", status: "Open", source: "Facebook", message: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 10  },
    //          {sender_name: "souvik sen", priority: "low", status: "Open", source: "Facebook", message: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 9 },
    //          {sender_name: "souvik sen", priority: "low", status: "Open", source: "Facebook", message: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 7 },
    //          {sender_name: "souvik sen", priority: "medium", status: "Open", source: "Facebook", message: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 3 }
    //         ]
    // }
    this.state = {data: null}
  }
  
  componentWillReceiveProps(newProps) {
    console.log('content mid component changed props')
    let url = server + '/api/issues?status=1&category=' + ((newProps.category !== null) ? newProps.category : 'null')
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        console.log(res.length)
        this.setState({data: res})
      });
  }

  render() {
    console.log('rendering contentMid with category', this.props.category)
    if (this.state.data === null) 
      return (
        <div className="col1">
          "No issues here!"
        </div>
      )
    
    return (
      <div className="col1">
        <div className="tickets">
          {
            this.state.data.map((each,i) => 
              <Issues clickHandler = {() => this.props.updateActiveIssue(each)}
                status = {each.status} 
                priority = {each.priority}
                key = {i}
                id = {each.id} 
                message = {each.message} 
                sender_name = {each.sender_name} 
                source = {each.source} 
              />
            )
          }
        </div>
      </div>
    );
  }
}

