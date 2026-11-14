import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import ENV_CONFIG from "../config/env.config";



//*register

export const register = catchasync(async (req: Request, res: Response, next: NextFunction) => {

    const { full_name, email, password, phone } = req.body;

    if (!full_name) {
        throw new AppError("fullname is required", 400);
    }

    if (!email) {
        throw new AppError("email is required", 400);
    }

    if (!password) {
        throw new AppError("Password is required", 400);
    }

    //* create user instance
    const user = new User({ full_name, email, phone, password });

    //* hash password
    const hash = await hashPassword(password);
    user.password = hash;

    //* upload profile image

    //* save patient
    await user.save();

    //? remove password from response
    const { password: _, ...rest } = user.toObject();

    //* send status code
    sendResponse(res, {
        message: "account created!",
        data: rest,
        statusCode: 201,
    });

});

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

     //*createjwt
    const access_token=generateJwtToken({
        _id:user._id,
        email:user.email,
        role:user.role,
    });
     
     const{password:_, ...rest}=user.toObject();

     //*set cookie header
     res.cookie('access_token',access_token,{
        secure:ENV_CONFIG.NODE_ENV==="development"?false:true,
        httpOnly:ENV_CONFIG.NODE_ENV==="development"?false:true,
        expires:new Date(Date.now()+ENV_CONFIG.COOKIE_EXPIRES_IN *24*60*60*1000),
        sameSite:ENV_CONFIG.NODE_ENV==="development" ? "lax":"none",
     });


     //*send success response
     sendResponse(res,{
        message:"Login Success!",
        data:{
            user:rest,
            access_token,
        },
        statusCode:201,
     });

    }catch(error){
        next(error);
    }
} 


//*changepw

//*changeemail

//*update profile image