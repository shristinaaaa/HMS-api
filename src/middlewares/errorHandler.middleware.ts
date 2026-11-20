//to send error as http response
import { NextFunction, Request, Response } from "express";
import ENV_CONFIG from "../config/env.config";


const errorHandler=(error:any,_:Request,res:Response,__:NextFunction)=>{
     const message=error?.message??'internal server error';//error ma msg xa vane tei use garne natra internal server error pass garne 
     const statusCode=error?.statusCode??500;
     const status=error?.status??'error';
     const success=error?.success??'false';

    res.status(statusCode).json({
        message,  
        status,
        success,
        data:null, 
        stack:ENV_CONFIG.NODE_ENV==="development" ? error?.stack : null,
        details:error?.details??null,
    });
};
export default errorHandler