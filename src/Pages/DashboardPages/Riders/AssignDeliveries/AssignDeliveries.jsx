import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuthHook from "../../../../useAuthHook";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

export default function AssignDeliveries() {
  const { user } = useAuthHook();
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });
  console.log(data);
  if (!data) {
    return <Loading />;
  }

  // handleDeliveryStatusUpdate
  function handleDeliveryStatusUpdate(parcel, status) {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    const message = ` you ${status}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then(() => {
        alert(message);
        refetch();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Total AssignDeliveries: {data.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cnfirm</th>
              <th>Others Aciton</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parcel, i) => {
              return (
                <tr>
                  <th> {i + 1} </th>
                  <td>{parcel.parcelName}</td>
                  <td>
                    {parcel.deliveryStatus === "rider-arriving" ? (
                      <span>Accepted</span>
                    ) : (
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider-arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                    )}
                    <button className="btn btn-warning text-black ms-4">
                      Reject
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel-picked-up")
                      }
                      className="btn btn-accent "
                    >
                      Pick UP{" "}
                    </button>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel-delivered")
                      }
                      className="btn btn-secondary ms-2"
                    >
                      Delivered{" "}
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
