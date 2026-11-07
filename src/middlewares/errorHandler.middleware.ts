import { NextFunction, Request, Response } from "express";


const errorHandler=(error:any,_:Request,res:Response,__:NextFunction)=>{
     const message=error?.message??'internal server error';//error ma msg xa vane tei use garne natra internal server error pass garne 
     const statusCode=error?.statusCode??'500';
     const status=error?.status??'error';
     const success=error?.success??'false';

    res.status(statusCode).json({
        message,  
        status,
        success,
        data:null, 
        stack:error?.stack??null,
    });
};
export default errorHandler