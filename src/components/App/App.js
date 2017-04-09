import React, { Component, PropTypes } from 'react';
import { MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from '../../common/customTheme';
import Header from '../Header/Header';
import './App.css';

const theme = getMuiTheme(customTheme);

class App extends Component {

  static childContextTypes = {
    account: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      loggedIn: false
    };
  }

  getChildContext() {
    return {
      account: {
        loggedIn: this.showAsLoggedIn,
        loggedOut: this.showAsLoggedOut
      },
    };
  }

  showAsLoggedIn = () => {
    this.setState({ loggedIn: true });
  };

  showAsLoggedOut = () => {
    this.setState({ loggedIn: false });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="App">
          <Header loggedIn={this.state.loggedIn}/>
          { React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn}) }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
