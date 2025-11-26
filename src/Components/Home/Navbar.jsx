import React from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import Button from "./Button";
import useAuthHook from "../../useAuthHook";

export default function Navbar() {
  const { user, logOutuser } = useAuthHook();
  // handle user log out
  function handleUserLogout() {
    logOutuser();
  }
  // navbar all list
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
        <NavLink to="/add-parcel">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/be-a-rider">Be a Rider</NavLink>
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

          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{list}</ul>
        </div>
        <div className="navbar-end gap-2">
          {user && (
            <div>
              <div
                className="tooltip tooltip-open tooltip-bottom"
                data-tip={user.displayName}
              >
                <img
                  className="size-10 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
            </div>
          )}
          {user ? (
            <Link
              onClick={handleUserLogout}
              to="/login"
              className="btn btn-outline border-gray-300 text-gray-600 rounded-xl"
            >
              Log Out
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline border-gray-300 text-gray-600 rounded-xl"
            >
              Sign In{" "}
            </Link>
          )}
          <Link className="hidden lg:block">
            <Button btnText={"Be a Raider"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
