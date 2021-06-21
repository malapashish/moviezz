import React  from 'react';  
import { HashRouter as Router , Route, Switch } from "react-router-dom";

import './App.css';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import  Details from './Pages/Details'; 
import CrewList from './Pages/CrewList'; 
import Movie from './Pages/Movie';
import Series from './Pages/Series';
import NavBar from './components/NavBar';

const App = () => { 
    return(
        <>
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
        </>
    )
}

export default App