import React, { Component } from 'react';
import '../Main.css';
import Issues from './Issues'

export default class ContentMid extends Component {
  constructor(props){
    super(props)
    // this.state = {
    //   data: [{author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 2, },
    //          {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 10  },
    //          {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 9 },
    //          {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 7 },
    //          {author: "souvik sen", type: "Open", media: "Facebook", payload: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 3 }
    //         ]
    // }
    this.state = {
      data: [
        {id: 1, message: "Hello from the server side!", sender: "Himanshu Shekhar", status: "closed", source: "twitter"}
      ]
    }
  }
  componentDidMount() {
    let sample_data = {id: 1, message: "Hello from the server side!", sender: "Himanshu Shekhar", status: "closed", source: "twitter"}
    
    fetch('http://localhost:8000/api/issues?status=1')
    .then((response) => {
      console.log(response);
      console.log(response.status);
      console.log(response.json());
      this.setState((oldState) => { 
        return {data: sample_data} 
      })
      // this.setState({data: response.json()});
    });
  }
  render() {
    return (
      <div className="col1">
      <div className="tickets">
      {
        this.state.data.map((issue,i) =>
          <Issues 
            id = {issue.id} 
            message = {issue.message}
            sender = {issue.sender} 
            status = {issue.status}
            source = {issue.source}
          />
        )
      }
    </div>
    </div>
  );
}
}
