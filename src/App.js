import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Favourites from './components/favourites/Favourites';
import Profile from './components/profile/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Home} />
        <Route path="/favourites" exact component={Favourites} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;


