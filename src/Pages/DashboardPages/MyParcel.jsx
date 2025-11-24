import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuthHook from "../../useAuthHook";
import { Eye, Trash, UserPen } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";

export default function MyParcel() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthHook();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/?email=${user.email}`);
      return res.data;
    },
  });
  console.log(parcels);

  //   handle Delete
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  }

  return (
    <div>
      <h1>MyParcel</h1>
      <p>{parcels.length}</p>

      {/* table info */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment status </th>
              <th>Delivary status </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels &&
              parcels.map((parcel, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{parcel.parcelName}</td>
                    <td>{parcel.cost}</td>
                    <td>
                      {parcel.paymentStatus ? (
                        <span className="text-green-300 font-bold">Paid</span>
                      ) : (
                        <Link
                          className="btn btn-sm btn-primary text-black"
                          to={`/dashboard/payments/${parcel._id}`}
                        >
                          {" "}
                          Pay
                        </Link>
                      )}
                    </td>
                    <td>Blue</td>
                    <td className="flex gap-2">
                      <button className="btn ">
                        <Eye />
                      </button>
                      <button className="btn ">
                        {" "}
                        <UserPen />
                      </button>
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn "
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
