import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo-modern.svg';
import './navbar.css';

const Menu = () => (
  <>
    <Link to='/'>Home</Link>
    <Link to='/books'>View Books</Link>
    <Link to='/addBook'>Add Book</Link>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <img src={logo} alt='Lumos Library' className='brand-logo' />
        <div className='brand-text'>
          <span className='brand-name'>Lumos Library</span>
          <span className='brand-tagline'>Curate. Discover. Delight.</span>
        </div>
      </div>

      <div className='navbar-links_container'>
        <Menu />
        <Link className='pill-btn' to='/addBook'>+ Add Title</Link>
      </div>

      <div className='navbar-menu'>
        {toggleMenu ? (
          <RiCloseLine color='#0f172a' size={26} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color='#0f172a' size={26} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className='navbar-menu_container scale-up-center'>
            <div className='navbar-menu_container-links'>
              <Menu />
              <Link className='pill-btn full-width' to='/addBook' onClick={() => setToggleMenu(false)}>
                + Add Title
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
