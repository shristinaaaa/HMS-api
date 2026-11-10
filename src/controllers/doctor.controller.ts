import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendresponse.utils";
import AppError from "../utils/appError.utils";
import Doctor from "../models/doctor.model";

export const getAllDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const doctors = await Doctor.find()
            .populate("userId");

        if(!doctors){
            throw new AppError("User is not in Database",404)
        }    

        sendResponse(res,{
            message:"doctor's data fetched successfully",
            data:doctors,
            statusCode:201,
        });

    } catch (error) {
        next(error);
    }
};