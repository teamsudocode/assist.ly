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
      user: "Jade",
      priority: 18,
      issue_id: 34
    }
  }

  updateCategory = (i) => {
    this.setState({category: i})
    console.log(i)
  }

  render() {
    return (
      <div>
        <div className="titlebar"><img alt = "Logo" src = {require("./assets/logo.svg")}/></div>
        <div className="view">
          <ContentLeft category = {this.state.category} updateCategory = {(i) => this.updateCategory(i)}/>
          <ContentMid category = {this.state.category}/>
          <ContentRight user = {this.state.user} priority= {this.state.priority} issue_id={this.state.issue_id}/>
        </div>
        
      </div>
    );
  }
}


