import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Related to authentication
import jwt_decode from "jwt-decode";
import sethAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "./actions/authAction";

//related to store
import {Provider} from "react-redux";
import store from "./stores/store";

//importing components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/auth/Dashboard'

// check for token to keep user logged in
if(localStorage.jwtToken){
  //set token header auth 
  const token = localStorage.jwtToken;
  sethAuthToken(token);
  //decode token and get user info exp
  const decoded = jwt_decode(token);
  //set user is authenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000; //to get in millisecond
  if(decoded.exp < currentTime ){
    //logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          </Switch>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
