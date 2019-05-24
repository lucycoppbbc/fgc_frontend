import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit() {}
  renderForm() {
    return(
      <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="email" bsSize="large">
        <ControlLabel className="log-in__text">Email</ControlLabel>
        <FormControl
          className="log-in__input-text"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup controlId="password" bsSize="large">
        <ControlLabel className="log-in__text">Password</ControlLabel>
        <FormControl
          value={this.state.password}
          type="password"
          className="log-in__input-text"
          onChange={this.handleChange}
        />
      </FormGroup>
      <div className="log-in__button_wrapper">
      <button 
       className="log-in__button"
        // disabled={!this.validateForm()}
        type="submit"
      >
        Login
      </button>
      </div>
    </form>
    )
  }


  render() {
    return (
      <div className="Login">
       {this.renderForm()}
      </div>
    );
  }
}
