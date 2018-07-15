import React, { Component } from 'react';
import ReactTooltip         from 'react-tooltip';
import {Animated}           from "react-animated-css";

import './search.scss';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      text : "",
      results : []
    }
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    
  }

  componentWillMount(){
    
  }

  handleInput(e) {
    this.setState({text : e.target.value});
  }

  render() {
    return (
      <Animated animationIn="fadeIn" animationOut="jello" animationInDelay={50} animateOnMount={true} isVisible={true}>
        <div className="view">
          <div className="">
            <div className="text-center">
              <input onChange={this.handleInput} type="text" name="query" placeholder="Search Deals & Stores" />
            </div>
            <a className="search">
              
            </a>
            <a className="close float-right" >
              
            </a>
            <div id="search" className=" results m-5 row">
              <div id="search-results" className="results m-5 row">
                <h1>{this.state.text}</h1>
              </div>
              <div id="deal-results" className="results m-5 row"></div>
            </div>
          </div>
        </div>
      </Animated>
    )
  }
}

export default Search;
