import React, { Component } from 'react';
import './Main.css';
import ContentLeft from './components/ContentLeft'
import ContentMid from './components/ContentMid'
import ContentRight from './components/ContentRight'


export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: null,
      activeIssue: null
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
                      activeIssue={this.state.issue} 
                      updateActiveIssue = {(newIssue) => this.updateActiveIssue(newIssue)}
          />
          <ContentRight clientName={this.props.clientName} 
                        issue={this.state.issue}
          />
        </div>
        
      </div>
    );
  }
}


