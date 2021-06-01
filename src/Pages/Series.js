import React from 'react';
import { NavLink } from 'react-router-dom';

const Series = () => {
    return(
        <>
            <nav>   
                <NavLink exact to = '/' className = 'nav-link' activeClassName = 'active'>
                    Home    
                </NavLink>
                <NavLink to = '/fav' className = 'nav-link' activeClassName = 'active'>
                    Feavourites
                </NavLink> 
                <NavLink to = '/movies' className = 'nav-link' activeClassName = 'active'>
                    Movies
                </NavLink>
                <NavLink to = '/series' className = 'nav-link' activeClassName = 'active'>
                    Series
                </NavLink>
            </nav>
            <div>
                Hello from Series component
            </div>
        </>
    )
};

export default Series;