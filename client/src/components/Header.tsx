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
          <NavLink className='header-link' to='/addmanufacturer' exact>
            <p className='header__inner__item'>Manufacturer</p>
          </NavLink>
          <NavLink className='header-link' to='/addproduct' exact>
            <p className='header__inner__item'>Add Product</p>
          </NavLink>
          <NavLink className='header-link' to='/comingsoon' exact>
            <p className='header__inner__item'>Sign In</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
