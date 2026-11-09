import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";


//*register
export const register=async(req:Request,res:Response, next:NextFunction)=>{
    try{
        const {full_name,email,password,phone}=req.body;
        if(!full_name){
            const error:any=new Error("fullname required");
            error.status="fail";//error is an object so we are setting its properties
            error.statusCode=400;
            error.success=false;
            throw error;
        }
        if(!email){
            const error:any=new Error("email required");
            error.status="fail";
            error.statusCode=400;
            error.success=false;
            throw error;
        }
        if(!password){
            const error:any=new Error("password required");
            error.status="fail";
            error.statusCode=400;
            error.success=false;
            throw error;
        }

        //*create user instance
        const user=new User({full_name,email,phone,password});

        //*hash password 


        //*upload profile image

        //*save patient
        await user.save();

        //*send status code
        res.status(201).json({
            message:"Account created",
            success:true,
            status:"Success",
        });

    }catch(error){
       next(error);
    }

};


//*login

//*changepw

//*changeemail

//*update profile image