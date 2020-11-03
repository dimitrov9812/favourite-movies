import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Favourites from './components/favourites/Favourites';
import Profile from './components/profile/Profile';
import Upcoming from './components/upcoming/Upcoming';
import Popular from './components/latest/Popular';
import Search from './components/search/Search';
import Random from './components/random/Random';
import Details from './components/details/Details';

const App = () => {
  return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register} />
            <Route path="/home" exact component={Home} />
            <Route path="/favourites" exact component={Favourites} />
            <Route path="/random" exact component={Random} />
            <Route path="/popular" exact component={Popular} />
            <Route path="/upcoming" exact component={Upcoming} />
            <Route path="/search" exact component={Search} />
            <Route path="/details" exact component={Details} />
            <Route path="*" component={Home} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;


