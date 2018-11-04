import React from 'react';
import { Navbar, NavbarItem } from 'bloomer';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <Navbar className="Navbar">
        <NavbarItem>Fuzzy Logic</NavbarItem>
      </Navbar>
    </div>
  );
};

export default Header;
