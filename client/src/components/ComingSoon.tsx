import React from "react";
import logo from "../imgs/lookup-logo_search.svg";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div
      className='form-body form-width text-on-background'
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h2 style={{ marginBottom: "0.5em" }}>Coming Soon</h2>
      <div>There's nothing to see here at the moment!</div>
      <div style={{ margin: "3em auto" }}>
        <img
          style={{ marginTop: "1em", height: "10em" }}
          src={logo}
          alt='logo'
        />
      </div>
      <Link style={{ alignSelf: "flex-end", textDecoration: "none" }} to='/'>
        <Button
          variant='contained'
          component='span'
          endIcon={<HomeIcon />}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Home
        </Button>
      </Link>
    </div>
  );
}
