import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";


//*register
export const register=async(req:Request,res:Response, next:NextFunction)=>{
    try{
        const {full_name,email,password,phone}=req.body;
        if(!full_name){
            
            throw new AppError("fullname is required",400);
        }
        if(!email){
            
            throw new AppError("email is required",400);
        }
        if(!password){
            
            throw new AppError("Password is required",400);
        }

        //*create user instance
        const user=new User({full_name,email,phone,password});

        //*hash password 
        const hash=await hashPassword(password);
        user.password=hash;

        //*upload profile image

        //*save patient
        await user.save();

        //?response ma pw bahek aru matra dekhina and to convert user document to object and destructure  
        const { password: _, ...rest } = user.toObject();


        //*send status code
        sendResponse(res,{
            message:"account created!",
            data:rest,
            statusCode:201,
        });

    }catch(error){//The error variable now holds the AppError object.
       next(error);
    }

};


//*login

//*changepw

//*changeemail

//*update profile image