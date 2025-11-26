import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function BeARider() {
  const axiosSecure = useAxiosSecure();
  const { register, watch, handleSubmit } = useForm();
  const servieCenter = useLoaderData();
  const duplicatRegion = servieCenter.map((r) => r.region);
  const regions = [...new Set(duplicatRegion)];

  const districtByregion = (region) => {
    const matchedRegion = servieCenter.filter((r) => r.region === region);
    const district = matchedRegion.map((d) => d.district);
    return district;
  };

  const watchRegion = watch("region");

  const handleRiderApplicaion = (formData) => {
    // console.log(formData);
    axiosSecure
      .post("/riders", formData)
      .then((res) => console.log("saved riders data in db", res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-11/12 mx-auto">
      {/* title text */}
      <div>
        <h1 className="text-6xl title text-secondary ">Be a Rider</h1>

        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — <br /> we
          deliver on time, every time.
        </p>
      </div>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
        <div className="card-body">
          <form
            onSubmit={handleSubmit(handleRiderApplicaion)}
            className="fieldset"
          >
            {/* Your Name */}
            <label className="label">Your Name </label>
            <input
              {...register("name")}
              type="text"
              className="input"
              placeholder="Your Name"
            />

            {/* Driving License Number */}
            <label className="label">Driving License Number </label>
            <input
              {...register("drivingLicense")}
              type="text"
              className="input"
              placeholder="Driving License Number"
            />

            {/* Your Email */}
            <label className="label">Your Email </label>
            <input
              {...register("email")}
              type="email"
              className="input"
              placeholder="Your Email"
            />

            {/* Your Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your Region</legend>
              <select
                {...register("region")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((region) => (
                  <option>{region}</option>
                ))}
              </select>
            </fieldset>

            {/* Your District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your District</legend>
              <select
                {...register("district")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByregion(watchRegion).map((district) => (
                  <option>{district}</option>
                ))}
              </select>
            </fieldset>

            {/* NID No */}
            <label className="label">NID No </label>
            <input
              {...register("nidNo")}
              type="text"
              className="input"
              placeholder="NID No"
            />

            {/* Phone Number */}
            <label className="label">Phone Number </label>
            <input
              {...register("phoneNo")}
              type="text"
              className="input"
              placeholder="Phone Number"
            />

            <button className="btn btn-primary text-black mt-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
