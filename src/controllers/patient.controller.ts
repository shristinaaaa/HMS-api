import { NextFunction, Request, Response } from "express";
import Patient from "../models/patient.model";
import User from "../models/user.model";

// Get patient profile
export const getPatientProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const patient = await Patient.findOne({
            userId: req.params.userId
        }).populate("userId");

        if (!patient) {
            const error: any = new Error("Patient not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Patient profile fetched successfully",
            success: true,
            data: patient
        });

    } catch (error) {
        next(error);
    }
};


// Update patient profile
export const updatePatientProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const patient = await Patient.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!patient) {
            const error: any = new Error("Patient not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Patient profile updated successfully",
            success: true,
            data: patient
        });

    } catch (error) {
        next(error);
    }
};