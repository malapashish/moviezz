import React  from 'react';  
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import MovieDetails from './Pages/MovieDetails';
import Movie from './Pages/Movie';
import Series from './Pages/Series';

const App = () => { 
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route  path = '/movies'component = {Movie} />
                <Route path = '/series' component = {Series} />
                <Route path = "/fav" component = {Favourites} />
                <Route path = '/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
                <Route path = '/fav/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
            </Switch>
        </BrowserRouter>
    )
}

export default App