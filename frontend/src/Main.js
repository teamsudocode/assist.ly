import React, { Component } from 'react';
import './Main.css';
import ContentLeft from './components/ContentLeft'
import ContentMid from './components/ContentMid'
import ContentRight from './components/ContentRight'


export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: 3,
      activeIssue: {sender_name: "souvik sen", priority: "high", status: "Open", source: "Facebook", message: "od110510389196784000 the ordered product didn't deliver to me and the delivery boy didn't approach me at all but the order status is showing that customer has rejected the order not once but thrice…", issue_id: 3 }
      
    }
  }

  updateCategory = (i) => {
    this.setState({category: i})
    console.log('updating category to', i)
  }

  updateActiveIssue = (newIssue) => {
    this.setState({activeIssue: newIssue})
    console.log('updating active issue to', newIssue.id)
  }

  render() {
    console.log('rendering main with category', this.state.category)
    return (
      <div>
        <div className="titlebar"><img alt = "Logo" src = {require("./assets/logo.svg")}/></div>
        <div className="view">
          <ContentLeft clientName={this.props.clientName}
                       category = {this.state.category}
                       updateCategory = {(i) => this.updateCategory(i)}
          />
          <ContentMid clientName={this.props.clientName}
                      category = {this.state.category}
                      updateActiveIssue = {(newIssue) => this.updateActiveIssue(newIssue)}
          />
          <ContentRight clientName={this.props.clientName} 
                        issue={this.state.activeIssue.id}
          />
        </div>
        
      </div>
    );
  }
}


