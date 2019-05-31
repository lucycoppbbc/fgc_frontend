import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.scss";

export default class Home extends Component {
    constructor(props) {
      super(props);
    }

  renderTitleAndIntro() {
    return (
      <div className="home-title">
        <p>Feltwell Cards & Gifts </p>
        <p className="home-title__dots">...</p>
 
      </div>
    )
  }

  renderLogInButton () {
    return(
      <button type="button" className="home-menu__button btn">Log In</button>
    )
  }

  renderSignUpButton() {
    return(
      <button className="home-menu__button btn">Sign Up</button>
    )
  }

  renderAuthMenu() {
    return(
      <div className="home-menu">
      <div className="home-menu__level">
        <button type="button" className="home-menu__button btn">Add Products</button>
        <button type="button" className="home-menu__button btn">View Products</button>
      </div>
     
     <div className="home-menu__level">
        <button type="button" className="home-menu__button btn">Search Products</button>
        <button type="button" className="home-menu__button btn">Update Products</button>
     </div>

      </div>
    )
  }

  renderNonAuthMenu() {
    return (
      <div className="home-menu">
          {this.renderSignUpButton()}
          {this.renderLogInButton()}
      </div>
    )
   
  }




  render() {
    return (
      <div className="home-container">
        {this.renderTitleAndIntro()}
        {this.props.isAuthenticated ? this.renderAuthMenu() : this.renderNonAuthMenu()}
      </div>
    );
  }
}
