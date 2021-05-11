import React  from 'react';  
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
const App = () => { 
    return(
        <BrowserRouter>
            <Switch>
                <Route path = "/" component = {Home} exact />
                <Route path = "/fav" component = {Favourites} />
            </Switch>
        </BrowserRouter>
    )
}

export default App