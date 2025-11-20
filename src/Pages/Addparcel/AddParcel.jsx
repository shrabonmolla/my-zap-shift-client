import React from "react";

export default function AddParcel() {
  return (
    <form className="w-11/12 m-auto">
      <section>
        <h1 className="title text-secondary">Add Parcel</h1>
      </section>
      <hr />

      {/* parcel type */}
      <section>
        <h1 className="text-2xl ">Enter your parcel details</h1>
        <label className="label mr-4">
          <input
            type="radio"
            value="document"
            className="radio mr-4"
            defaultChecked
          />
          document
        </label>
        <label className="label ml-4">
          <input type="radio" value="non-document" className="radio" />
          non-document
        </label>
      </section>

      {/* parcel info: name,weight */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <fieldset className="fieldset ">
          <label className="label">Parcel Name</label>
          <input type="text" className="input" placeholder="Parcel Name" />
        </fieldset>
        <fieldset className="fieldset ">
          <label className="label">Parcel Weight(Kg)</label>
          <input type="text" className="input" placeholder="Parcel Weight" />
        </fieldset>
      </section>

      <hr />

      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Sender detals */}
        <div>
          <h1 className="title text-secondary">Sender Details</h1>
          <fieldset className="fieldset">
            <label className="label">Sender Name</label>
            <input type="text" className="input" placeholder="Name" />

            <label className="label">Sender Pickup Wire house</label>
            <input type="text" className="input" placeholder="Password" />

            <label className="label">Address</label>
            <input type="text" className="input" placeholder="Address" />

            <label className="label">Sender Contact No</label>
            <input type="text" className="input" placeholder="Contact" />

            <label className="label">Your Region</label>
            <input type="text" className="input" placeholder="Region" />

            <label className="label">Pickup Instruction</label>
            <input type="text" className="input" placeholder="Pickup" />
          </fieldset>
        </div>

        {/* Reciver detaiols */}
        <div>
          <h1 className="title text-secondary">Reciver Details</h1>
          <fieldset className="fieldset">
            <label className="label">Receiver Name</label>
            <input type="text" className="input" placeholder="Name" />

            <label className="label">Receiver Delivery Wire house</label>
            <input type="text" className="input" placeholder="Delivery" />

            <label className="label">Receiver Address</label>
            <input type="text" className="input" placeholder="Address" />

            <label className="label">Receiver Contact No</label>
            <input type="text" className="input" placeholder="Contact" />

            <label className="label">Receiver Region</label>
            <input type="text" className="input" placeholder="Region" />

            <label className="label">Delivary Instruction</label>
            <input type="text" className="input" placeholder="Delivary" />
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
