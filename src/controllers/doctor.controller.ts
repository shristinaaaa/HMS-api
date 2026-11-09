import { NextFunction, Request, Response } from "express";
import Doctor from "../models/doctor.model";

export const getAllDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const doctors = await Doctor.find()
            .populate("userId");

        res.status(200).json({
            message: "Doctors fetched successfully",
            success: true,
            data: doctors
        });

    } catch (error) {
        next(error);
    }
};