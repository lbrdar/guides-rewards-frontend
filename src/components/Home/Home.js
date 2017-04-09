import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import './Home.css';

class Home extends Component {

  renderTraveler = () => {
    return (
      <div>
        <p className="home-subtitle">We are here to help you on your adventure.</p>
        <p className="home-text">
          Got some cool landmark in front of you and don't know what it is or want to know more about it?
          Take a picture of it, upload it to our page and use our landmark recognition system to find all the
          information you need!
        </p>
        <Link to="/landmarks" className="home-link">
          <RaisedButton
            primary={true}
            label="Detect landmark"
          />
        </Link>
      </div>
    );
  };

  renderBusiness = () => {
    return (
      <div>
        <p className="home-subtitle">We are here to connect you with travelers.</p>
        <p className="home-text">
          Thank you for being part of out team, we are grateful that you've recognized us and joined us in serving
          travelers the very best on their adventures and helping them have the best time all the time.
        </p>
        <Link to="/business-places" className="home-link">
          <RaisedButton
            primary={true}
            label="Add business place"
          />
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div className="home">
        <div className={ this.props.loggedIn ? "business" : "traveler" } >
          <h2 className="home-title">Welcome, { this.props.loggedIn ? 'business owner' : 'traveler'}!</h2>
          { this.props.loggedIn ?  this.renderBusiness() : this.renderTraveler() }
        </div>
      </div>
    );
  }
}

export default Home;
