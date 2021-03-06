import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaAlignJustify } from "react-icons/fa"; 

import ThemeToggle from "../components/ThemeToggle";

const NavBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const hamburgerClickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className={`${isClicked ? `responsive` : ``}`}>
      <NavLink exact to="/" className="nav-link " activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/fav" className="nav-link" activeClassName="active">
        Favorites
      </NavLink>
      <NavLink to="/movie" className="nav-link" activeClassName="active">
        Movies
      </NavLink>
      <NavLink to="/tv" className="nav-link" activeClassName="active">
        Series
      </NavLink>
      <ThemeToggle />
      <IconContext.Provider value={{ size: "30px" }}>
        <div className="hamburger-icon" onClick={hamburgerClickHandler}>
          <FaAlignJustify />
        </div>
      </IconContext.Provider>
    </nav>
  );
};

export default NavBar;
