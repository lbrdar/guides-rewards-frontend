import React, { Component } from 'react';
import { Paper, RaisedButton, TextField } from 'material-ui';
import './Codes.css';

class Codes extends Component {
  constructor() {
    super();

    this.state = {
      country: "",
      city: ""
    }
  }

  handleFindCodes = () => {

  };

  render() {
    return (
      <div className="Codes">
        <h1 className="codes-title">Discover interesting promotion codes</h1>
        <p className="codes-text">
          Find interesting promotion codes that you can win near place you currently are or plan to go soon.
          By taking photos and sending them to us you get a chance of winning cool stuff.
        </p>
        <Paper className="codes-container" zDepth={5}>
          <form className="codes-form">
            <TextField
              floatingLabelText="Country"
              className="codes-input"
              value={this.state.country}
              onChange={(e) => this.setState({ country: e.target.country })}
            />
            <TextField
              floatingLabelText="City"
              className="codes-input"
              value={this.state.city}
              onChange={(e) => this.setState({ city: e.target.city })}
            />
            <RaisedButton
              label="Find codes"
              primary={true}
              onClick={this.handleFindCodes}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default Codes;
