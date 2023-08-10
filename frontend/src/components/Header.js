import headerLogo from '../images/logo.svg';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';


function Header({ onSignOut, userEmail }) {
  
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип Место" src={headerLogo} />
      <Routes>
        <Route path="/signin" element={
          <Link to="/signup" className="header__link">Регистрация</Link>
        } />
        <Route path="/signup" element={
          <Link to="/signin" className="header__link">Войти</Link>
        } />         
        
        <Route path="/" element={
          <div className="header__container">
            <p className="header__user-email">{userEmail}</p>
            <Link to="/signin" className="header__link" onClick={onSignOut}>Выйти</Link>
          </div>
        } />
      </Routes>      
    </header>
  )
}

export default Header;