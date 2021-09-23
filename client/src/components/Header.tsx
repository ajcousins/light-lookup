import React from "react";
import logo from "../imgs/lookup-logo_light.svg";

export default function Header() {
  return (
    <div className='header'>
      <div className='header__inner'>
        {/* <h1>Light Lookup</h1> */}
        <a href='.'>
          <img src={logo} alt='Light lookup' />
        </a>
        <p className='header__inner__end'>Sign In</p>
      </div>
    </div>
  );
}
