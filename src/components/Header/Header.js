import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import logo from '../../Guides&Rewards.png';
import { setCookie, getCookie } from '../../common/CookiesUtils';
import './Header.css';

const styles = {
  button: {
    width: "100%",
    height: "100%",
    padding: "15px"
  },
  buttonLabel: {
    fontSize: "1.5em",
    fontFamily: "Bebas Neue, Comic Sans",
    textAlign: "center",
    padding: 0
  }
};

class Header extends Component {

  static propTypes = {
    loggedIn: React.PropTypes.bool
  };

  static contextTypes = {
    account: React.PropTypes.object
  };

  logout = () => {
    const email = getCookie("loggedInUser");
    console.log('Logout username: ', email);
    setCookie("loggedInUser", email, 0);
    this.context.account.loggedOut();
  };

  accountLogin = () => {
    return (
      <p className="account-info">
        Business owner? <br />
        <Link to="/register" className="account-link" activeClassName="account-link account-active">Register</Link> or <Link to="/login" className="account-link" activeClassName="account-link account-active">log in</Link> !
      </p>
    )
  };

  accountLogout = () => {
    return (
      <p className="account-info">
        <Link
          to="/"
          onClick={this.logout}
          className="account-link"
          activeClassName="account-link account-active"
        >
          Log out
        </Link>
      </p>
    )
  };

  menuForBusiness = () => {
    return (
      <div className="header-menu">
        <IndexLink to="/business-places" className="header-link" activeClassName="header-link header-active">
          <FlatButton
            label="My Places"
            primary={true}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </IndexLink>
        <Link to="/business-events" className="header-link" activeClassName="header-link header-active">
          <FlatButton
            label="My events"
            primary={true}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </Link>
        <Link to="/business-codes" className="header-link" activeClassName="header-link header-active">
          <FlatButton
            label="My promotion codes"
            primary={true}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </Link>
      </div>
    );
  };

  menuForTraveler = () => {
    return (
      <div className="header-menu">
        <IndexLink to="/" className="header-link" activeClassName="header-link header-active">
          <FlatButton
            label="Home"
            primary={true}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </IndexLink>
        <Link to="/landmarks" className="header-link" activeClassName="header-link header-active">
          <FlatButton
            label="What is it?"
            primary={true}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </Link>
        <Link to="/codes" className="header-link" activeClassName="header-link header-active">
          <FlatButton
            label="Active codes"
            primary={true}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div className="Header">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo"/>
        </div>
        { this.props.loggedIn ? this.menuForBusiness() : this.menuForTraveler() }
        <div className="account">
          { !this.props.loggedIn ? this.accountLogin() : this.accountLogout() }
        </div>

      </div>
    );
  }
}

export default Header;
