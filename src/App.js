import React  from 'react';  
import { HashRouter as Router , Route, Switch } from "react-router-dom";

import './App.css';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import MovieDetails from './Pages/MovieDetails';
import SeriesDetails from './Pages/SeriesDetails';
import CompleteMovieCrewList from './Pages/CompleteMovieCrewList';
import CompleteSeriesCrewList from './Pages/CompleteSeriesCrewList';
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
                <Route exact path = '/series/seriesdetails/:id' render = { props => <SeriesDetails {...props} /> } />
                <Route exact path = '/movies/moviedetails/:id'  render = { props => <MovieDetails {...props} /> } /> 
                <Route exact path = '/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
                <Route exact path = '/seriesdetails/:id' render = { props => <SeriesDetails {...props}  /> } />
                <Route exact path = "/fav" component = {Favourites} />
                <Route exact path = '/fav/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
                <Route exact path = '/fav/seriesdetails/:id' render = { props => <SeriesDetails {...props} /> } />
                <Route exact path = '/moviedetails/:id/cast' render = { props => <CompleteMovieCrewList {...props} /> } />
                <Route exact path = '/seriesdetails/:id/cast' render = { props => <CompleteSeriesCrewList {...props} /> } />
                <Route exact path = '/recommendation/:id' render = { props => <MovieDetails {...props} /> } />
            </Switch>
        </Router>
        </>
    )
}

export default App