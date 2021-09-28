import React from "react";

export default function Footer() {
  return (
    <div className='structure__footer'>
      <div className='body-width structure__footer__inner'>
        <ul>
          <li className='title'>Light Lookup</li>
          <li>Product Finder</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
        <ul>
          <li className='title'>About</li>
          <li>Summary</li>
          <li>Lighting Glossary</li>
          <li>FAQ</li>
        </ul>
        <ul>
          <li className='title'>News</li>
          <li>Updates</li>
          <li>Future Features</li>
        </ul>
        <ul>
          <li className='title'>Contact</li>
          <li>alvincousins.com</li>
          <li>alvin.cousins.tech@gmail.com</li>
          <li>https://github.com/ajcousins</li>
        </ul>
        <div className='structure__footer__inner__bottom'>
          Copyright © 2021 Alvin Cousins. All rights reserved.
        </div>
      </div>
    </div>
  );
}
