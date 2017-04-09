import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../components/App/App';
import Home from '../components/Home/Home';
import Landmarks from '../components/Landmarks/Landmarks';
import Places from '../components/Places/Places';
import Codes from '../components/Codes/Codes';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

class Routes extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="landmarks" component={Landmarks}/>
          <Route path="places" component={Places}/>
          <Route path="codes" component={Codes}/>

          <Route path="register" component={Register}/>
          <Route path="login" component={Login}/>
        </Route>
      </Router>
    )
  }
}

export default Routes;
