import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { setCookie } from '../../common/CookiesUtils';
import './Register.css';

class Register extends Component {

  static contextTypes = {
    account: React.PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      pass1: "",
      pass2: "",
      errors: {
        username: "",
        email: "",
        pass1: "",
        pass2: ""
      }
    };
  }

  validate = () => {
    const { username, email, pass1, pass2 } = this.state;
    const emailRexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = {
      username: "",
      email: "",
      pass1: "",
      pass2: ""
    };
    let valid = true;

    if(pass1 !== pass2) {
      errors.pass1 = "Passwords do not match!";
      errors.pass2 = "Passwords do not match!";
    }

    if (!emailRexp.test(email))  errors.email = "Email must be valid email address";

    if(!username)  errors.username = "This field is required";
    if(!email)  errors.email = "This field is required";
    if(!pass1)  errors.pass1 = "This field is required";
    if(!pass2)  errors.pass2 = "This field is required";

    this.setState({ errors });

    Object.keys(errors).map(key => {
      if (errors[key] !== "") valid = false;
    });
    return valid;
  };

  handleRegister = () => {
    const valid = this.validate();

    if (valid) {
      const { username, email, pass1 } = this.state;

      window.fetch('http://f2189154.ngrok.io/api/registers', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ username, email, password: pass1 })
      }).then(res => res.json())
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
      <div className="Register">
        <Paper className="register-container" zDepth={5}>
          <h1 className="register-title">Welcome to our page!</h1>
          <p className="register-text">
            Hello and thank you for deciding to join us, we are happy to see our tourist guide grows, and all of you
            business owners helping us are responsible for it.
          </p>
          <form className="register-form">
            <TextField
              hintText="Your username"
              className="register-input"
              errorText={this.state.errors.username}
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value})}
            />
            <TextField
              hintText="Email address"
              className="register-input"
              errorText={this.state.errors.email}
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value})}
            />
            <TextField
              hintText="Password"
              className="register-input"
              type="password"
              errorText={this.state.errors.pass1}
              value={this.state.pass1}
              onChange={(e) => this.setState({ pass1: e.target.value})}
            />
            <TextField
              hintText="Repeat password"
              className="register-input"
              type="password"
              errorText={this.state.errors.pass2}
              value={this.state.pass2}
              onChange={(e) => this.setState({ pass2: e.target.value})}
            />
            <RaisedButton
              label="Register"
              primary={true}
              onClick={this.handleRegister}
              />
          </form>
        </Paper>
      </div>
    );
  }
}

export default Register;
