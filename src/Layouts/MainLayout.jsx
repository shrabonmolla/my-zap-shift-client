import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Home/Footer";
import Navbar from "../Components/Home/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
