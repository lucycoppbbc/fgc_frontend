import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "../styles/forms.scss"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm = () => this.state.email === "" || this.state.password === ""


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
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
        <div className="form__button_wrapper">
        <LoaderButton
            block
            bsSize="large"
            disabled={this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            className="form__button"
            loadingText="Logging in…"
          />

        </div>
      </form>
    );
  }

  render() {
    return <div className="Login">{this.renderForm()}</div>;
  }
}
