import React, { Component } from 'react';
import './Main.css';
import ContentLeft from './components/ContentLeft'
import ContentMid from './components/ContentMid'
import ContentRight from './components/ContentRight'


export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: 3
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
          <ContentRight/>
        </div>
        
      </div>
    );
  }
}


