import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
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
export const login =async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const{email,password}=req.body;
        if(!email){
            throw new AppError("Email is required",400);
        }
        if(!password){
            throw new AppError("password is require",400);
        }

    //*find user
     const user=await User.findOne({email});

     if(!user) throw new AppError("Credentials dont match in our db",400);

     //*compare pw
     const isPasswordMatched=comparePassword(password,user.password);//userle enter gareko pw,db ma stored vako pw

     if(!isPasswordMatched)
        throw new AppError("password doesn't match",400);
     
     const{password:_, ...rest}=user.toObject();

     //*send success response
     sendResponse(res,{
        message:"Login Success!",
        data:rest,
        statusCode:201,
     })

     //todo:create jwt accesstoken



    }catch(error){
        next(error);
    }
}


//*changepw

//*changeemail

//*update profile image