import React from "react";
import logo from "./symbol.svg";
import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <div className="navbar bg-base-100 bg-gradient-to-r from-gradient-1 to-gradient-2 font-manrope">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* <li>
              <Link to="/documentation">Documentation</Link>
            </li> */}
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/addproduct">Add Product</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <img src={logo} className="h-6 w-12" alt="logo" />
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl text-dash-color"
        >
          Perfios
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 text-dash-color">
          <li tabIndex={0}>
            <a>
              Account
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100 text-black">
              <li>
                {" "}
                <Link to="/signup">SignUp</Link>
              </li>
              <li>
              <Link to="/login">Login</Link>
            </li>
            </ul>
          </li>
        </ul>
        {/* <button className="btn btn-ghost btn-circle text-dash-color">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button> */}
      </div>
    </div>
  );
}
