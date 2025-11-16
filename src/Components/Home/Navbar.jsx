import React from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import Button from "./Button";

export default function Navbar() {
  const list = (
    <>
      <li>
        <NavLink to="/">Services</NavLink>
      </li>
      <li>
        <NavLink to="/">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="w-11/12 m-auto ">
      <div className="navbar bg-base-100 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {list}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl">
            <Logo />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{list}</ul>
        </div>
        <div className="navbar-end gap-2">
          <Link className="btn btn-outline border-gray-300 text-gray-600 rounded-xl">
            Sign In{" "}
          </Link>
          <Link className="hidden lg:block">
            <Button btnText={"Be a Raider"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
