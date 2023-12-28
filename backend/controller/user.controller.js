import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const updateUser=async(req,res,next)=>{
    try{
    const userId=req.user.id;
    if(userId!==req.params.id){
        return next(errorHandler(401,'you can only update your own account'));
    }
    if(req.body.password){
        req.body.password = await bcrypt.hash(password, 10);
    }
    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            avatar:req.body.avatar
        }
    },{new:true}
    );
    const{password,...rest}=updateUser._doc
    return res.status(200).json({
        success:true,
        message:'user updated successfully',
        data:rest
    })
    }
    catch(error){
        next(error);
    }
}