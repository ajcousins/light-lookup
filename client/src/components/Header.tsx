import React from "react";
import logo from "../imgs/lookup-logo_light.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className='header'>
      <div className='header__inner body-width'>
        <a href='.'>
          <img src={logo} alt='Light lookup' />
        </a>
        <div className='header__inner__menu'>
          <NavLink to='/addproduct' exact>
            <p className='header__inner__item'>Add Product</p>
          </NavLink>
          <p className='header__inner__item'>Sign In</p>
        </div>
      </div>
    </div>
  );
}
