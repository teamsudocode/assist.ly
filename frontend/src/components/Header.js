import React, { Component } from 'react';
import '../style.css';

class Header extends Component {
  render() {
    return (
        <div className="titlebar"><img src={require("../assets/logo.svg")} alt= "Logo"/></div>
    );
  }
}

export default Header;
