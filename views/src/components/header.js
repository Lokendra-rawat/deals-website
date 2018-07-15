import React, { Component } from 'react';
import ReactTooltip         from 'react-tooltip';
import {Animated}           from "react-animated-css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}                           from 'react-router-dom';


import './header.scss';

class Header extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container p-2 text-center">
          <div className="cearfix">
            <ul className="dropdown-btn d-inline-block float-left">
              <svg className="rf-icon rf-icon--hamburger" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 10' height='10' width='15'>
                <path d='M0 8h15v2H0zM0 4h15v2H0zM0 0h15v2H0z' />
              </svg>
              <ul className="dropdown">
                <li> hello </li>
                <li> hello </li>
                <li> hello </li>
                <li> hello </li>
                <li> hello </li>
                <li> hello </li>
                <li> hello </li>
                <li> hello </li>
              </ul>
            </ul>

            <h3 className="d-inline-block money">
              <Link className="" to={'/'}>Money<span>kicks</span></Link>
            </h3>
            <Link className="search d-inline-block float-right" to={'/skills'}>
              <svg className="rf-icon rf-icon--search" xmlns='http://www.w3.org/2000/svg' viewBox='5605.991 836 16.958 16.95'>
                <path data-name='Path 150' d='M5612.5 836a6.493 6.493 0 0 1 5.29 10.27l4.88 4.88a1.076 1.076 0 0 1-1.52 1.52l-4.88-4.88a6.5 6.5 0 1 1-3.77-11.79zm0 11a4.5 4.5 0 1 0-4.5-4.5 4.5 4.5 0 0 0 4.5 4.5z' />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
