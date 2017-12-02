import React, { Component } from 'react';
import '../Main.css';

export default class ContentLeft extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [{name:"Where is my order",value:4},
                   {name:"Where is my order",value:4},
                   {name:"Where is my order",value:4},
                   {name:"Where is my order",value:4},
                   {name:"Where is my order",value:4},
                   {name:"Where is my order",value:4}
                  ],
    
      selected: this.props.category,
      }
  }
  

  selecting(id) {
      console.log("hi")
      this.props.updateCategory(id)
    }

  _ulRender = (item,i) => {

    if(i === this.props.category){
      return(
          <li onClick={ () => this.selecting(i) }
          key = {i}>
            <div className="active">
              <p>{item.name}</p><label>{item.value}</label>
            </div>
        </li>
      )
    }
    else {
      return(
          <li onClick={ () => this.selecting(i) }  key = {i}>
            <div>
              <p>{item.name}</p><label>{item.value}</label>
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
          {this.state.categories.map((elem, i) => this._ulRender(elem,i))}
        </ul>  
      </div>
    );
  }
}


