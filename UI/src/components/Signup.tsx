import React from "react";

export default function Login(): JSX.Element {
  return (
      <div className="py-36 pl-80 bg-dash-color font-manrope h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left ">
            <h1 className="text-5xl font-bold pl-8">SignUp now!</h1>
            <div className="w-[32rem] text-left pl-8">
              <p className="py-6 ">
                Welcome to the developer documentation for Perfios. You will
                find information about Perfios products and APIs to help you get
                started quickly.
              </p>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary ">SignUp</button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
