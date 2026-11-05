import express, { type NextFunction, type Request, type Response } from "express";

//*app
const app=express();


//*middlewares


//*health check route
app.get("/",(_:Request,res:Response)=>{
    res.status(200).json({
        message:"server is up and running",
        status:"success",
        success:true,
        data:null,
    });
});

//*path not found


//*error handler middleware


export default app
