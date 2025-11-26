import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import SocialSignIn from "../../Components/Auth/SocialSignIn";

import useAuthHook from "../../useAuthHook";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Axis3D } from "lucide-react";
export default function Register() {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, setUser, updateUser } = useAuthHook();
  // handaling register user

  function handleRegister(formdata) {
    // console.log("after register", formdata);
    const userPhoto = formdata.photo[0];
    // console.log(userPhoto);
    registerUser(formdata.email, formdata.password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // 1.store imge to from data
        const fromdata = new FormData();
        fromdata.append("image", userPhoto);
        // 2.send img to imgbb and get the url
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=21056502350557c7e773fb27b0740e40`,
            fromdata
          )
          .then((data) => {
            console.log(data);
            const profileData = {
              email: formdata.email,
              displayName: formdata.name,
              photoURL: data.data.data.url,
            };
            // saving user data in db
            axiosSecure
              .post("/users", profileData)
              .then((res) => console.log("saved user data in db ", res.data));

            // updating user porfile
            updateUser(profileData)
              .then(() => console.log("profile updated"))
              .catch((err) => console.log(err.message));
          });
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
      <div className="card-body">
        <div>
          <h1 className="title">Create an Account</h1>
          <p>Register with ZapShift</p>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="fieldset">
          <input {...register("photo")} type="file" className="file-input" />
          <label className="label">Name</label>
          <input
            {...register("name", { required: "Name is requrired" })}
            type="text"
            className="input"
            placeholder="Name"
          />
          {/* name error handeling */}
          {errors.name?.type == "required" && (
            <p className="text-red-300">Name field is reuquird</p>
          )}

          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email?.type == "required" && (
            <p className="text-red-300">Email field is reuquird</p>
          )}

          <label className="label">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type == "required" && (
            <p className="text-red-300">password field is reuquird</p>
          )}
          {errors.password?.type == "minLength" && (
            <p className="text-red-300">
              password have to be atleast 6 charecter
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 bg-primary text-black border-0 shadow-none">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
          {/* divider */}
          <div className="flex w-full flex-col">
            <div className="divider">OR</div>
          </div>
          <SocialSignIn />
        </form>
      </div>
    </div>
  );
}
