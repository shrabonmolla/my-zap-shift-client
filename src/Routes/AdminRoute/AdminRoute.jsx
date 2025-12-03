import React from "react";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading/Loading";

export default function AdminRoute({ children }) {
  const { role, riderLoading } = useRole();
  if (riderLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <h1 className="text-6xl"> tumi to admin na</h1>;
  }
  return children;
}
