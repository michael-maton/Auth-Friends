import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import Friends from "./components/Friends";
import PrivateRoute from "./components/PrivateRoute";
import { axiosWithAuth } from './utils/axiosWithAuth';

function App() {

  const logout = () => {
    axiosWithAuth()
      .post("/logout", {userToken: localStorage.getItem("token")})
    .then(res => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <Router>
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
      </ul>
      <Switch>
        <PrivateRoute exact path="/friends" component={Friends} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
