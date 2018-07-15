import React, { Component } from 'react';
import ReactTooltip         from 'react-tooltip';
import {Animated}           from "react-animated-css";

import './content.scss';

class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      deals : []
    }
    this.getData = this.getData.bind(this);
  }

  getData(){
    fetch("/hello")
      .then(data => data.json())
      .then(data => this.setState({deals : data}))
  }

  componentDidMount(){
    const url = "/";
    const url1 = "https://hacker-news.firebaseio.com/v0/topstories.json";

    fetch("/hello")
      .then(data => data.json())
      .then(data => this.setState({deals : data}))
  }

  componentWillMount(){
    console.log(this.state.deals)
  }

  render() {
    var view = <img id="loader" src="images/loader.svg" />;

    if(this.state.deals && this.state.deals.length > 0){
      view = this.state.deals.map((x,i) => (
          <Animated animationIn="fadeIn" animationOut="jello" animationInDelay={70*i} animateOnMount={true} isVisible={true} key={x._id} className="col-xs-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 outer-box">
            <div className="box">
              <div className="image">
                <img onError={e=>{e.src='images/supreme1.jpg'}} data-original={x.smallImageUrl} src={x.smallImageUrl} />
              </div>
              <div className="">
                <ReactTooltip id={x._id}/>
                <p className="dealname" data-tip={x.dealName} data-effect="solid" data-delay-show={80} data-for={x._id} data-place="top">
                  {x.spinName ? x.spinName : x.dealName}
                </p>
                <div className="box-text">
                  <div className="price">
                    <div className="">
                      <del className="cutprice">
                        <small>
                          {x.cutPrice}
                        </small>
                      </del>
                      <span className="mainprice">
                        ${x.mainPrice}
                      </span>
                    </div>
                  </div>
                  <div className="clearfix">
                    <div className="text-left">
                      <a className="storename float-left mt-2" href={x.storename}>
                        {x.storeName}
                      </a>
                      <a className="getdeal btn btn-primary btn-sm float-right" data-tip={"Get this Deal for $" + x.mainPrice} data-delay-show={80} data-for={x._id} data-effect="solid" href={x.dealUrl}>
                        Get deal
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        ))
    }

    return (
      <div className="text-center">
        <div className="container">
          <div className="row m-0" id="content-box">
            {view}
          </div>
          <br/>
          <div className="text-center ml-auto mr-auto">
            <button style={{borderRadius : "2rem"}} className="btn btn-secondary" onClick={this.getData}>
              View More Deals 
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Content;
