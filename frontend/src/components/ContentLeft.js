import React, { Component } from 'react';
import '../Main.css';
import {server} from './../env'


export default class ContentLeft extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [
        {"pk": 2, "category": "logistics", "open": 0},
        {"pk": 3, "category": "support complains", "open": 0},
        {"pk": 4, "category": "booking", "open": 0},
        {"pk": 5, "category": "delivery", "open": 0},
        {"pk": 6, "category": "inappropriate items", "open": 0}
      ],
      selected: this.props.category,
    }
  }
  
  componentDidMount() {
    let url = server + '/api/categories?client_name=' + this.props.clientName;
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      console.log(res)
      if (res.status !== undefined && res.status !== 200) {
        alert('Some error occured! Please report it to us \nContentLeft.js is the culprit :(')
        return
      }
      this.setState({categories: res})
    });
  }
  
  
  selecting(id) {
    this.props.updateCategory(id)
  }
  
  _ulRender = (each, i) => {
    
    if(each.pk === this.props.category){
      return(
        <li onClick={ () => this.selecting(each.pk) } key = {each.pk}>
          <div className="active">
            <p>{each.category}</p><label>{each.open}</label>
          </div>
        </li>
      )
    }
    else {
      return(
        <li onClick={ () => this.selecting(each.pk) } key = {each.pk}>
          <div>
            <p>{each.category}</p><label>{each.open}</label>
          </div>
        </li>
      )
    }
  }
  render() {
    return (
      <div className="col0">
      <h1>Type of issue</h1>
      <div className="divider"></div>
      <ul>
      {this.state.categories.map((each, i) => this._ulRender(each,i))}
      </ul>  
      </div>
    );
  }
}


