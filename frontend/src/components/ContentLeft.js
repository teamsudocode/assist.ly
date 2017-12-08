import React, { Component } from 'react';
import '../Main.css';
import {server} from './../env'


export default class ContentLeft extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [{name:"Where is my Order",value:4},
                   {name:"Replacement Order",value:13},
                   {name:"Payment Issue",value:10},
                   {name:"Contact Issue",value:21},
                   {name:"Broken Item",value:6},
                   {name:"Where is my order",value:17}
                  ],
    
      selected: this.props.category,
      }
  }
  
  componentDidMount() {
    fetch(server+'/api/issues?status=1')
      .then(res => res.json())
      .then((res) => {
        console.log(res)
      });
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


