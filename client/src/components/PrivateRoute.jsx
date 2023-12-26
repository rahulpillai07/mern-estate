import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SignIn from "../pages/Signin";

function PrivateRoute() {
    const {currentUser}=useSelector((state)=>state.user);
  return(
    <>
      {currentUser?(
        <Outlet/>):(
            <SignIn/>
        )
    }
    </>
  

  )

}
export default PrivateRoute;
