import mongoose from "mongoose";
import { Role } from "../types/enum.types";
import jwt from "jsonwebtoken"
import ENV_CONFIG from "../config/env.config";
  

interface IJwtPayload{
    _id:mongoose.Types.ObjectId;
    role:Role;
    email:string;
}

export const generateJwtToken=(payload:IJwtPayload)=>{
    try{
        return jwt.sign(payload,ENV_CONFIG.JWT_SECRET as any,{
            "expiresIn":ENV_CONFIG.JWT_EXPIRES_IN as any,
        });
    }catch(error){
        console.log(error);
        throw error;
    }
}