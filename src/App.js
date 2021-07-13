import React  from 'react';  
import { HashRouter as Router , Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

import './App.css';
import Home from './containers/Pages/Home';
import Favourites from './containers/Pages/Favourites';
import  Details from './containers/Pages/Details'; 
import CrewList from './containers/Pages/CrewList'; 
import Movie from './containers/Pages/Movie';
import Series from './containers/Pages/Series';
import NavBar from './containers/NavBar';

const App = () => { 
    return(
        <>
        <Provider store = {store} >
        <Router>
            <NavBar />
            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route exact path = '/movies' component = {Movie} /> 
                <Route exact path = '/series' component = {Series} /> 
                <Route exact path = '/movies/details/:id'  render = { props => <Details {...props} /> } /> 
                <Route exact path = '/series/details/:id'  render = { props => <Details {...props} /> } /> 
                <Route exact path = '/details/:id' render = { props => <Details {...props} /> } /> 
                <Route exact path = "/fav" component = {Favourites} />
                <Route exact path = '/fav/details/:id' render = { props => <Details {...props} /> } /> 
                <Route exact path = '/details/:id/cast' render = { props => <CrewList {...props} /> } /> 
            </Switch>
        </Router>
        </Provider>
        </>
    )
}

export default App