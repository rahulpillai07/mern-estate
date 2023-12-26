import React from "react";
import{GoogleAuthProvider,getAuth, signInWithPopup} from'firebase/auth';
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


function OAuth() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleGoogleClick=async()=>{
        try {
            const provider=new GoogleAuthProvider()
            const auth=getAuth(app)
            const result=await signInWithPopup(auth,provider);
            
            const response=await axios.post('http://localhost:3000/api/auth/google',{
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            })
            const data=response.data;
            console.log(data);
            navigate("/")
            dispatch(signInSuccess(data));
           
            
        } catch (error) {
            console.log('could not connect with the google account',error)
            
        }
    }
  return(
    <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-60" type="button" onClick={handleGoogleClick}>Continue With Google</button>
  )
}

export default OAuth;
