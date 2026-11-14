//login ko ,register ko schema farak hunxa so we are making a middleware to call and pass the schema into it
import { ZodObject } from "zod";
import AppError from "../utils/appError.utils";
import { Request,NextFunction,Response } from "express";

export const validate=(schema:ZodObject)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const result=schema.safeParse({
            body:req.body,
            params:req.params,
            query:req.query,
        });
        if (result.error) {
    const errors = result.error.issues.map((issue) => {
        return {
            message: issue.message,
            path: issue.path.join("."),
        };
    });  

    next(new AppError(errors[0]?.message, 400,  errors));
    return;
    }

        req.body=result.data.body;
        Object.assign(req.params,result.data.params);
        Object.assign(req.query,result.data.query);
        next();

    };
};