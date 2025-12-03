import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  //   console.log(data);
  return (
    <div>
      <h1>ManageUsers</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user, index) => {
                return (
                  <tr key={index} className="bg-base-200">
                    <th>{index + 1}</th>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>``
    </div>
  );
}
