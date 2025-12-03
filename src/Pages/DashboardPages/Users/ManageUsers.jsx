import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { UserMinus, UserRoundCheck } from "lucide-react";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  //   console.log(data);

  //    handleAdmin
  function handleAddAdmin(id) {
    const roleInfo = { role: "admin" };
    axiosSecure
      .patch(`/users/${id}`, roleInfo)
      .then((res) => {
        console.log("updated user role", res);
        refetch();
      })
      .catch((err) => console.log(err));
  }

  function handleRemoveAdmin(id) {
    const roleInfo = { role: "user" };
    axiosSecure
      .patch(`/users/${id}`, roleInfo)
      .then((res) => {
        console.log("updated user role", res);
        refetch();
      })
      .catch((err) => console.log(err));
  }
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
                    <td>
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(user._id)}
                          className="text-red-400"
                        >
                          <UserMinus />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddAdmin(user._id)}
                          className="text-green-400"
                        >
                          <UserRoundCheck />
                        </button>
                      )}
                    </td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      ``
    </div>
  );
}
