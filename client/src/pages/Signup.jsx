import React from "react";

export default function SignUp() {
  return(
    <div className="max-w-lg mx-auto p-4">
       <h1 className="text-3xl text-center font-semibold my-7">
      Signup
    </h1>
    <form className="flex flex-col gap-5 w:">
    <input type="text" placeholder="Username" className="bg-slate-200 border p-3 rounded-lg" id='username'/>
    <input type="text" placeholder="Email" className="bg-slate-200 border p-3 rounded-lg" id='Email'  />
    <input type="password" placeholder="Password" className="bg-slate-200 border p-3 rounded-lg" id='password'  />
    <button className=" p-3 rounded-lg text-white hover:opacity-90 bg-blue-500">SIGN UP</button>
    </form>
    <div className="flex gap-3 mt-5">
      <p>Have an account?</p>
      <Link to={'/sign-in'}>
      <span className="text-blue-800">Sign In</span>
      </Link>
    </div>

    </div>
  )
}
