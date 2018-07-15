import React, { Component } from 'react';
import ReactTooltip         from 'react-tooltip';
import {Animated}           from "react-animated-css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}                           from 'react-router-dom';

import './app.scss';

import Header from './components/header';
import Content from './components/content';
import Search from './components/search';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      var : 'hello',
      loaded : false
    }
  }

  componentDidMount(){
    this.setState({loaded : true});
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Switch>
            <Route exact path='/skills' component={Search} />
            <Route exact path='/' component={Content} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
