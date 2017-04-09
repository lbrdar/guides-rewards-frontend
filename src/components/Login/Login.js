import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { setCookie } from '../../common/CookiesUtils';
import './Login.css';

class Login extends Component {
  static contextTypes = {
    account: React.PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  validate = () => {
    const { email, password } = this.state;
    const emailRexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = {
      email: "",
      password: ""
    };

    let valid = true;

    if (!emailRexp.test(email))  errors.email = "Email must be valid email address";

    if(!email)  errors.email = "Please enter your email.";
    if(!password)  errors.password = "Please enter your password.";

    this.setState({ errors });

    Object.keys(errors).map(key => {
      if (errors[key] !== "") valid = false;
    });
    return valid;
  };

  handleRegister = () => {
    const valid = this.validate();

    if (valid) {
      const { email, password } = this.state;

      window.fetch('http://f2189154.ngrok.io/api/loginusers', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ email, password })
      })
            .then((res) => {
              console.log("Data from server: ", res);
              setCookie("loggedInUser", email, 1);
              this.context.account.loggedIn();
              this.props.router.push('/');
            })
            .catch((err) => {
              console.log("Error: ", err);
            });
    }
  };

  render() {
    return (
      <div className="Login">
        <Paper className="login-container" zDepth={5}>
          <h1 className="login-title">Welcome to our page!</h1>
          <p className="login-text">
            Hello! :)
          </p>
          <form className="login-form">
            <TextField
              floatingLabelText="Email address"
              className="login-input"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value})}
            />
            <TextField
              floatingLabelText="Password"
              className="login-input"
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value})}
            />
            <RaisedButton
              label="Login"
              primary={true}
              onClick={this.handleRegister}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default Login;