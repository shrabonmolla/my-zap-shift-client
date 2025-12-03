import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BookmarkPlus, BookmarkX, ReceiptRussianRuble } from "lucide-react";

export default function ManageRiders() {
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // handleApproveRider

  // new metod
  function updateRiderStatus(rider, status) {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure
      .patch(`/riders/${rider._id}`, updateInfo)
      .then((res) => {
        console.log("rider status update", res);
        refetch();
      })
      .catch((err) => console.log(err));
  }

  function handleApproveRider(rider) {
    updateRiderStatus(rider, "approved");
  }

  function handleRejectRider(rider) {
    updateRiderStatus(rider, "reject");
  }

  // old method

  // function handleApproveRider(id) {
  //   const updateInfo = { status: "approved" };
  //   axiosSecure
  //     .patch(`/riders/${id}`, updateInfo)
  //     .then((res) => {
  //       console.log("rider status update", res);
  //       refetch();
  //     })
  //     .catch((err) => console.log(err));
  // }
  console.log(data);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>District</th>
            <th>Status</th>
            <th>Work Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((rider, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.district}</td>
                  <td>{rider.status}</td>
                  <td>{rider.workStatus}</td>
                  <td>
                    <button
                      onClick={() => handleApproveRider(rider)}
                      className="btn"
                    >
                      <BookmarkPlus />
                    </button>
                    <button
                      onClick={() => handleRejectRider(rider)}
                      className="btn"
                    >
                      <BookmarkX />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
