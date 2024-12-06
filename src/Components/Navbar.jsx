import React from "react";  
import { Link } from "react-router-dom";
import { useContextGlobal } from "./utils/ContextGlobal";
import ThemeToggleButton from './ThemeToggleButton';

const Navbar = () => {
  const { state } = useContextGlobal();

  return (
    <nav className="nav" id={state.theme}>
      <div className="links-navbar">
      <img className="navbar-logo" src="./DH.ico" alt="logo dental" />
  
        <Link to="/"> Home</Link>
        <Link to="/contact">Contacto</Link>
        <Link to="/favs">Favoritos</Link>
      </div>
      <ThemeToggleButton />
    </nav>
  );
};

export default React.memo(Navbar);

