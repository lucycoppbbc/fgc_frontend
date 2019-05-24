import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.scss";

export default class Home extends Component {
  renderTitleAndIntro() {
    return (
      <div className="home-title">
        <p>Feltwell Cards & Gifts
        <p className="home-title__dots">...</p>
        </p>
        <p className="home-title__intro">Welcome to Feltwell Cards & Gifts stock database.
        Please login or sign up.</p>
      </div>
    )
  }

  renderLogInButton () {
    return(
      <button type="button" className="home-login_signup_button btn">Log In</button>
    )
  }

  renderSignUpButton() {
    return(
      <button className="home-login_signup_button btn">Sign Up</button>
    )
  }




  render() {
    return (
      <div className="home-container">
        {this.renderTitleAndIntro()}
        <div className="home-menu">
          {this.renderSignUpButton()}
          {this.renderLogInButton()}
        </div>
      </div>
    );
  }
}
