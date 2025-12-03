import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuthHook from "../../../../useAuthHook";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

export default function AssignDeliveries() {
  const { user } = useAuthHook();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
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
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
