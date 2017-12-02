import React, { Component } from 'react';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { reducer } from './redux/index'

import Main from './Main'


const store = createStore(reducer)



class App extends Component {
  render() {
    return (
    <Provider store={store}>
       <Main />
    </Provider>
    );
  }
}

export default App;
