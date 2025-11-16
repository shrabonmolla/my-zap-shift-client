import React from "react";
import BannerSlider from "./BannerSlider";
import Button from "./Button";

export default function Banner() {
  return (
    <div className="relative">
      <BannerSlider />
      <div className="absolute bottom-2 lg:bottom-20 left-2 lg:left-10 z-10 flex gap-4">
        <Button btnText={"Track Your Parcel"} />
        <button className="btn bg-white">Be a Raider</button>
      </div>
    </div>
  );
}
