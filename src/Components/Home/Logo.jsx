import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
export default function Logo() {
  return (
    <Link to="/" className="flex items-center ">
      <img src={logo} alt="" />
      <h1 className="font-bold -m-2">ZapShift</h1>
    </Link>
  );
}
