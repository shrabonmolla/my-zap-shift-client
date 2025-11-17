import React from "react";
import { Link } from "react-router";
import SocialSignIn from "../../Components/Auth/SocialSignIn";
import useAuthHook from "../../useAuthHook";

export default function Login() {
  const { signInUser } = useAuthHook();
  function handleLogin(e) {
    e.preventDefalut();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then(() => console.log("login sucessfull"))
      .catch((err) => console.log(err.message));
  }
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
      <div className="card-body">
        <div>
          <h1 className="title">Welcome Back</h1>
          <p>Login with Zapshift</p>
        </div>
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 bg-primary text-black border-0 shadow-none">
            Login
          </button>
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="text-primary">
              Register
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
