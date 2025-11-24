import React from "react";
import { Link } from "react-router";

export default function PayCancel() {
  return (
    <div>
      <div className="text-4xl">Payment cancel korro keno dusto</div>
      <Link to="/dashboard/my-parcel">
        <button className="btn btn-primary text-black">Try again</button>
      </Link>
    </div>
  );
}
