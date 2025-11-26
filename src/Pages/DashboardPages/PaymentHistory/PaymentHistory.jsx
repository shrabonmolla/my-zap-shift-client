import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure(`/payments`);
      return res.data;
    },
  });

  //   console.log("payment history", data);
  return (
    <div>
      <h2>PaymentHistory</h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount </th>
              <th>Paid Time</th>
              <th>transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <Loading />
            ) : (
              data.map((paymnet, index) => {
                return (
                  <tr key={index} className="bg-base-200">
                    <th>{index + 1}</th>
                    <td>{paymnet.parcelName}</td>
                    <td>{paymnet.amount}</td>
                    <td>{paymnet.paidAt}</td>
                    <td>{paymnet.transactionId}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
