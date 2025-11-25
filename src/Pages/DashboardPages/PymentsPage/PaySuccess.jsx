import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function PaySuccess() {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success/?session_id=${sessionId} `)
        .then((res) => {
          console.log(res);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, []);
  return (
    <div>
      <div className="text-6xl ">Mama Payment successfulll hoise</div>
      <p>Your TransactionId: {paymentInfo.transactionId}</p>
      <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
    </div>
  );
}
