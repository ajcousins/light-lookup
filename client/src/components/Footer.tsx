import React from "react";
import { Link } from "react-router-dom";

const FooterLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <Link
      className='structure__footer__link'
      to={link}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <li>{text}</li>
    </Link>
  );
};

const FooterExternalLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <li>
      <a
        className='structure__footer__link'
        href={link}
        target='_blank'
        rel='noreferrer'
      >
        {text}
      </a>
    </li>
  );
};

export default function Footer() {
  return (
    <div className='structure__footer'>
      <div className='body-width structure__footer__inner'>
        <ul>
          <li className='title'>Light Lookup</li>
          <FooterLink link='/comingsoon/' text='Product Finder' />

          <FooterLink link='/comingsoon/' text='Login' />
          <FooterLink link='/comingsoon/' text='Register' />
        </ul>
        <ul>
          <li className='title'>About</li>
          <FooterExternalLink
            link='https://alvincousins.com/project/light-lookup'
            text='Summary'
          />
          <FooterLink link='/comingsoon/' text='Lighting Glossary' />
          <FooterLink link='/comingsoon/' text='FAQ' />
        </ul>
        <ul>
          <li className='title'>News</li>
          <FooterLink link='/comingsoon/' text='Updates' />
          <FooterLink link='/comingsoon/' text='Future Features' />
        </ul>
        <ul>
          <li className='title'>Contact</li>
          <FooterExternalLink
            link='https://alvincousins.com/'
            text='alvincousins.com'
          />
          <FooterExternalLink
            link='https://github.com/ajcousins'
            text='github.com/ajcousins'
          />
        </ul>
        <div className='structure__footer__inner__bottom'>
          Copyright © 2021 Alvin Cousins. All rights reserved.
        </div>
      </div>
    </div>
  );
}
