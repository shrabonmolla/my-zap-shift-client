import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

export default function AddParcel() {
  const { register, watch, handleSubmit } = useForm();
  const serviceCenters = useLoaderData();
  const duplicateRegion = serviceCenters.map((r) => r.region);
  const regions = [...new Set(duplicateRegion)];

  // disricted by region
  function distictByRegion(region) {
    const matchedregion = serviceCenters.filter((r) => r.region == region);
    const districts = matchedregion.map((d) => d.district);
    return districts;
  }

  // wathching sender regon
  const watchSenderRegion = watch("senderRegion");
  const watchReciverRegion = watch("reciverRegion");

  // handleAddParcel
  function handleAddParcel(formData) {
    console.log(formData);

    const isDocument = formData.parcelType === "document";
    const isSameDistrict = formData.senderDistrict === formData.reciverDistrict;
    const parcelWeight = parseFloat(formData.parcelWeight);

    if (parcelWeight <= 0) {
      return alert("invalid weight");
    }
    // price calculation

    let cost = 0;
    if (isDocument && parcelWeight > 0) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost ", cost);

    Swal.fire({
      title: "Are you sure?",
      text: `Your total cost is ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      // if (result.isConfirmed) {
      //   Swal.fire({
      //     title: "Deleted!",
      //     text: "Your file has been deleted.",
      //     icon: "success",
      //   });
      // }
    });
  }

  return (
    <form onSubmit={handleSubmit(handleAddParcel)} className="w-11/12 m-auto">
      <section>
        <h1 className="title text-secondary">Add Parcel</h1>
      </section>
      <hr />

      {/* parcel type */}
      <section>
        <h1 className="text-2xl ">Enter your parcel details</h1>
        <label className="label mr-4">
          <input
            {...register("parcelType")}
            type="radio"
            value="document"
            className="radio mr-4"
            defaultChecked
          />
          document
        </label>
        <label className="label ml-4">
          <input
            {...register("parcelType")}
            type="radio"
            value="non-document"
            className="radio"
          />
          non-document
        </label>
      </section>

      {/* parcel info: name,weight */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <fieldset className="fieldset ">
          <label className="label">Parcel Name</label>
          <input
            {...register("parcelName")}
            type="text"
            className="input"
            placeholder="Parcel Name"
          />
        </fieldset>
        <fieldset className="fieldset ">
          <label className="label">Parcel Weight(Kg)</label>
          <input
            {...register("parcelWeight")}
            type="number"
            className="input"
            placeholder="Parcel Weight"
          />
        </fieldset>
      </section>

      <hr />

      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Sender detals */}
        <div>
          <h1 className="title text-secondary">Sender Details</h1>
          {/* sender name */}
          <fieldset className="fieldset">
            <label className="label">Sender Name</label>
            <input
              {...register("senderName")}
              type="text"
              className="input"
              placeholder="Name"
            />

            {/* senderREgion  */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select a region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Select  a region"
                className="select"
              >
                <option disabled={true}>Select a region</option>
                {regions.map((r) => (
                  <option>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* sender District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select a District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Select  a District"
                className="select"
              >
                <option disabled={true}>Select a District</option>
                {distictByRegion(watchSenderRegion).map((d) => (
                  <option>{d}</option>
                ))}
              </select>
            </fieldset>

            <label className="label">Sender Contact No</label>
            <input
              {...register("senderContact")}
              type="text"
              className="input"
              placeholder="Contact"
            />

            <label className="label">Pickup Instruction</label>
            <input
              {...register("pickUpInstruction")}
              type="text"
              className="input"
              placeholder="Pickup"
            />
          </fieldset>
        </div>

        {/* Reciver detaiols */}
        <div>
          <h1 className="title text-secondary">Reciver Details</h1>
          <fieldset className="fieldset">
            <label className="label">Receiver Name</label>
            <input
              {...register("reciverName")}
              type="text"
              className="input"
              placeholder="Name"
            />

            <label className="label">Receiver Contact No</label>
            <input
              {...register("reciverContact")}
              type="text"
              className="input"
              placeholder="Contact"
            />

            {/* reciverREgion  */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select a region</legend>
              <select
                {...register("reciverRegion")}
                defaultValue="Select  a region"
                className="select"
              >
                <option disabled={true}>Select a region</option>
                {regions.map((r) => (
                  <option>{r}</option>
                ))}
              </select>
            </fieldset>

            {/* reciver District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select a District</legend>
              <select
                {...register("reciverDistrict")}
                defaultValue="Select  a District"
                className="select"
              >
                <option disabled={true}>Select a District</option>
                {distictByRegion(watchReciverRegion).map((d) => (
                  <option>{d}</option>
                ))}
              </select>
            </fieldset>
            <label className="label">Delivary Instruction</label>
            <input
              {...register("deliveryInstruction")}
              type="text"
              className="input"
              placeholder="Delivary"
            />
          </fieldset>
        </div>
        {/* button  */}
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn text-black bg-primary"
        />
      </section>
    </form>
  );
}
