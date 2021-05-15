import React  from 'react';  
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import MovieDetails from './Pages/MovieDetails';
const App = () => { 
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route  path = '/movies'/>
                <Route path = "/fav" component = {Favourites} />
                <Route path = '/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
                <Route path = '/fav/moviedetails/:id' render = { props => <MovieDetails {...props} /> } />
            </Switch>
        </BrowserRouter>
    )
}

export default App