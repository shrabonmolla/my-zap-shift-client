import React from "react";
import { useLoaderData, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function Payments() {
  const { paymentId } = useParams();
  const parcels = useLoaderData();
  const axiosSecure = useAxiosSecure();
  //   console.log(paymentId, parcels);

  //   handlePayment
  async function handlePayment() {
    const paymentInfo = {
      cost: parcels[0].cost,
      parcelName: parcels[0].parcelName,
      senderEmail: parcels[0].senderEmail,
      parcelId: parcels[0]._id,
    };
    const res = await axiosSecure.post(
      `/create-checkout-session `,
      paymentInfo
    );
    // console.log(res.data);
    window.location.href = res.data.url;
  }
  return (
    <div>
      <h1>{paymentId}</h1>
      <h1>{parcels[0].parcelName}</h1>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
}
