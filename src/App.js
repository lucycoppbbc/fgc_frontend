import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.scss";
import { AutoScaling } from "aws-sdk/clients/all";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }


  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }
  

  renderAuthLinks = () => (
    <Fragment>
    {this.state.isAuthenticated ? (
      <NavItem onClick={this.handleLogout}>Logout</NavItem>
    ) : (
      <Fragment>
        <LinkContainer to="/signup">
          <NavItem>Signup</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Fragment>
    )}
    </Fragment>
  )

  renderNavBar = childProps => (
    <div>
    <Navbar fluid collapseOnSelect className="app-nav_bar">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Feltwell Cards & Gifts</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className="app-nav_bar__options" pullRight>
          <Fragment>
            <LinkContainer to="/settings">
              <NavItem>Settings</NavItem>
            </LinkContainer>
          </Fragment>
          {this.renderAuthLinks()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Routes childProps={childProps} />
</div>
  )

  userHasAuthenticated = authenticated => this.setState({ isAuthenticated: authenticated });

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App container">{!this.state.isAuthenticating && this.renderNavBar(childProps)}</div>
    );
  }
}

export default withRouter(App);
