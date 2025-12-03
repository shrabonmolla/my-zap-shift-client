import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";

export default function AssignRiders() {
  const [selectedParcel, setSelectedParcel] = useState();
  const riderModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { data, refetch: pendingParcelRefetch } = useQuery({
    queryKey: ["pending-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });
  console.log(selectedParcel);

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  if (!data) {
    return <Loading></Loading>;
  }

  if (!riders) {
    return <Loading></Loading>;
  }

  console.log(riders);

  function handleOpenRiderModal(parcel) {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  }

  function handleAssingRider(rider) {
    const riderAssigninfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id} `, riderAssigninfo)
      .then(() => {
        alert("this rider has been assigned");
        pendingParcelRefetch();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Toatal pending Parcels:{data.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Pick UP District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parcel, i) => {
              return (
                <tr>
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>
                    <button
                      onClick={() => handleOpenRiderModal(parcel)}
                      className="btn btn-primary text-black"
                    >
                      Find Rider
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => {
                  return (
                    <tr>
                      <th>{i + 1}</th>
                      <td>{rider.name}</td>
                      <td>{rider.email}</td>

                      <td>
                        <button
                          onClick={() => handleAssingRider(rider)}
                          className="btn btn-primary text-black"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
