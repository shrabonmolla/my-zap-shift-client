import React from "react";
import Logo from "../Components/Home/Logo";
import { Outlet } from "react-router";
import Login from "../Pages/AuthPages/Login";
import authimg from "../assets/authImage.png";
export default function AuthLayout() {
  return (
    <div className="w-11/12 m-auto">
      <Logo />
      <section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <aside className=" flex items-center justify-center">
          <Outlet />
        </aside>
        <aside className=" bg-[#FAFDF0] flex items-center justify-center">
          <img src={authimg} alt="" />
        </aside>
      </section>
    </div>
  );
}
