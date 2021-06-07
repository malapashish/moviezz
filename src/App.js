import React  from 'react';  
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import MovieDetails from './Pages/MovieDetails';
import SeriesDetails from './Pages/SeriesDetails';
import Movie from './Pages/Movie';
import Series from './Pages/Series';
import NavBar from './components/NavBar';

const App = () => { 
    return(
        <>
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route  path = '/movies' component = {Movie} /> 
                <Route path = '/series' component = {Series} />
                <Route path = '/series/seriesdetails/:id' render = { props => <SeriesDetails {...props} /> } />
                <Route  path = '/movies/moviedetails/:id'  render = { props => <MovieDetails {...props} /> } /> 
                <Route path = '/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
                <Route path = '/seriesdetails/:id' render = { props => <SeriesDetails {...props}  /> } />
                <Route path = "/fav" component = {Favourites} />
                <Route path = '/fav/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
                <Route path = '/fav/seriesdetails/:id' render = { props => <SeriesDetails {...props} /> } />
            </Switch>
        </BrowserRouter>
        </>
    )
}

export default App