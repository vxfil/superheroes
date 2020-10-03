import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const logo = require('../Navbar/superhero.svg');

const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="http://localhost:3000">
          <img src={logo} width="112" height="28" />
        </a>
        <a
          role="button"
          className={`navbar-burger burger ${!menuIsOpen ? null : 'is-active'}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${!menuIsOpen ? null : 'is-active'}`}>
        <div className="navbar-start">
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/"
            exact
          >
            Create hero
          </NavLink>
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/heroes"
          >
            Heroes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
