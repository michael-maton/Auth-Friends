import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import Friends from "./components/Friends";
import PrivateRoute from "./components/PrivateRoute";
import { axiosWithAuth } from './utils/axiosWithAuth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = () => {
    axiosWithAuth()
      .post("/logout", {userToken: localStorage.getItem("token")})
    .then(res => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
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
          {!isLoggedIn && <Link to="/login">Login</Link>}
        </li>
        <li>
          {isLoggedIn && <Link onClick={logout}>Logout</Link>}
        </li>
        <li>
          {isLoggedIn && <Link to="/friends">Friends</Link>}
        </li>
      </ul>
      <Switch>
        <PrivateRoute exact path="/friends" component={Friends} />
        <Route path="/login" render={(props) => {
              return <Login {...props} setIsLoggedIn={setIsLoggedIn} />;
            }} />
        <Route render={(props) => {
              return <Login {...props} setIsLoggedIn={setIsLoggedIn} />;
            }} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
