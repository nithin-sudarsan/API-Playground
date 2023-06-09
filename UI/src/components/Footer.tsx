import React from "react";
import logo from "./symbol.svg";

export default function Footer():JSX.Element {
  return (
    <div>
      <footer
        className="footer bottom-0 p-4 lg:pl-80 bg-base-100 bg-gradient-to-r from-gradient-1 to-gradient-2 font-manrope "//fixed
      >
        <div>
          <div className="navbar-center">
            <img src={logo} className="h-6 w-12" alt="logo" />
            <a className="btn btn-ghost normal-case text-xl text-dash-color">
              Perfios
            </a>
            <p className="pl-4 text-dash-color">
              Realtime analysis and decisioning solution
            </p>
          </div>
        </div>

        <div className="text-dash-color">
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
