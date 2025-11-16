import React from "react";
import { MoveUpRight } from "lucide-react";
export default function Button({btnText}) {
  return (
    <div className="btn text-black bg-primary rounded-xl">
     {btnText}
      <span className="bg-secondary rounded-full text-primary p-1">
        <MoveUpRight />
      </span>
    </div>
  );
}
