import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const{currentUser}=useSelector((state)=>state.user);
  const fileRef=useRef(null);
  return (
    <>
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center mt-4">
      Profile
    </h1>
    
    <form className="flex flex-col gap-5  ">
    <input type="file" ref={fileRef} hidden accept="image/*"/>
      <img src={currentUser.userDetails.avatar}alt="/profilePic" className="w-24 h-24 self-center mt-4 rounded-full cursor-pointer object-cover" onClick={()=>fileRef.current.click()}/>
      
    <input
     type="text"
     placeholder="username"
     id="username"
     className="border p-3 rounded-lg "
     />
    <input
     type="text"
     placeholder="email"
     id="email"
     className="border p-3 rounded-lg "
     />
    <input
     type="password"
     placeholder="password"
     id="password"
     className="border p-3 rounded-lg "
     />
     <button className="bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-80">update</button>
     </form>
     <div className="flex justify-between mt-5">
      <span className="text-red-600 cursor-pointer">
        Delete Account
      </span>
      <span className="text-red-600 cursor-pointer">
        Sign Out
      </span>
     </div>
     </div>

    </>
  )
}
