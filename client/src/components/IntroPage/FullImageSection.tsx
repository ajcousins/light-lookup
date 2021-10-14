import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, Redirect } from "react-router-dom";

export default function FullImageSection({
  src,
  rightSide,
  headline,
  cta,
  photoCredit,
}: {
  src: string;
  rightSide?: boolean;
  headline: string;
  cta: string;
  photoCredit?: { text: string; link: string };
}) {
  return (
    <div className='intro-page__section'>
      <img src={src} alt='hero' />
      <div className='intro-page__section__wrapper'>
        <div className='intro-page__section__inner body-width'>
          {rightSide && <div className='intro-page__section__left-spacer' />}
          <div className='intro-page__section__inner__content'>
            <h1>{headline}</h1>
            <h3>{cta}</h3>
            <Link style={{ textDecoration: "none" }} to='/dashboard'>
              <LoadingButton
                variant='contained'
                size='large'
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                sx={{
                  padding: "1em 4em",
                  fontSize: "0.8rem",
                  width: "15em",
                }}
              >
                Get Started
              </LoadingButton>
            </Link>
          </div>
        </div>
      </div>
      {photoCredit && (
        <div className='intro-page__section__photo-credit'>
          <a href={photoCredit.link} target='_blank' rel='noreferrer'>
            {photoCredit.text}
          </a>
        </div>
      )}
    </div>
  );
}
