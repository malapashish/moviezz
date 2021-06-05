import React from 'react';
import { NavLink } from 'react-router-dom' 

const NavBar = () => {
    return(
        <nav>    
            <NavLink exact to = '/' className = 'nav-link ' activeClassName = 'active'>
                Home    
            </NavLink> 
            <NavLink to = '/fav' className = 'nav-link' activeClassName = 'active'>
                Favorites
            </NavLink> 
            <NavLink to = '/movies' className = 'nav-link' activeClassName = 'active'>
                Movies
            </NavLink>
            <NavLink to = '/series' className = 'nav-link' activeClassName = 'active'>
                Series
            </NavLink> 
        </nav>
    )
}

export default NavBar;