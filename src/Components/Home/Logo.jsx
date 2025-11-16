import React from "react";
import logo from "../../assets/logo.png";
export default function Logo() {
  return (
    <div className="flex items-center ">
      <img src={logo} alt="" />
      <h1 className="font-bold -m-2">ZapShift</h1>
    </div>
  );
}
