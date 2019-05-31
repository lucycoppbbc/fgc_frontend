import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import "../styles/forms.scss";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import { Auth } from "aws-amplify";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      secondPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return this.state.email === "" || this.state.password === "";
  }

  validateConfirmationForm() {
    return this.state.confirmationCode === "";
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleExistingUser = async event => {
    await Auth.resendSignUp(this.state.email)
    this.setState({
      username: this.state.email,
      user: "confirmingUser"
    })
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.password === this.state.secondPassword) {
      this.setState({ isLoading: true });
        try {
          const newUser = await Auth.signUp({
            username: this.state.email,
            password: this.state.password
          });
          this.setState({ newUser });
        } catch (e) {
          e.name === 'UsernameExistsException' ? this.handleExistingUser() : alert(e.message)
        }
        this.setState({ isLoading: false });
      } 
      else {
      alert("Passwords do not match");
    }
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignIn(this.state.email, this.state.confirmationCode)
      this.props.userHasAuthenticated(true)
      if(this.state.newUser !== "confirmingUser") {
        await Auth.signIn(this.state.email, this.state.password)
        this.props.history.push('/')
      } else {
        this.props.history.push('/login')
      }
     
    }
    catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  };

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel className="form__text">Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            className="form__input-text"
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <div className="form__button_wrapper">
          <LoaderButton
            block
            className="form__button"
            bsSize="large"
            disabled={this.validateConfirmationForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Verify"
            loadingText="Verifying…"
          />
        </div>
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel className="form__text">Email</ControlLabel>
          <FormControl
            className="form__input-text"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel className="form__text">Password</ControlLabel>
          <FormControl
            value={this.state.password}
            type="password"
            className="form__input-text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="secondPassword" bsSize="large">
          <ControlLabel className="form__text">Confirm Password</ControlLabel>
          <FormControl
            value={this.state.secondPassword}
            type="password"
            className="form__input-text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <div className="form__button_wrapper">
          <button
            className="form__button"
            disabled={this.validateForm()}
            type="submit"
            onClick={this.handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
