
import { Request, Response, NextFunction } from "express";
import Doctor from "../models/doctor.model";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";


//* APPROVE DOCTOR

export const approveDoctor = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find doctor and approve

        const doctor = await Doctor.findByIdAndUpdate(
            id,
            {
                is_approved: true,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("userId", "full_name email phone");

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        sendResponse(res, {
            message: "Doctor approved successfully!",
            data: doctor,
            statusCode: 200,
        });

    }
);
