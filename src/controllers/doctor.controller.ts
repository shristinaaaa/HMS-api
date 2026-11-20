 
import { Request, Response, NextFunction } from "express";
import Doctor from "../models/doctor.model";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";
import { Role } from "../types/enum.types";


//* CREATE DOCTOR

export const createDoctor = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const {
            userId,
            specialization,
            qualification,
            license_number,
            experience,
        } = req.body;

        //* check userId
        if (!userId) {
            throw new AppError("User ID is required", 400);
        }

        //* check whether user exists
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        //* check user role
        if (user.role !== Role.DOCTOR) {
            throw new AppError("User is not registered as a doctor", 400);
        }

        //* check whether doctor profile already exists
        const existingDoctor = await Doctor.findOne({ userId });

        if (existingDoctor) {
            throw new AppError("Doctor profile already exists", 409);
        }

        //* create doctor profile
        const doctor = await Doctor.create({
            userId,
            specialization,
            qualification,
            license_number,
            experience,
        });

        sendResponse(res, {
            message: "Doctor profile created successfully!",
            data: doctor,
            statusCode: 201,
        });
    }
);


//* GET ALL DOCTORS

export const getAllDoctors = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        //* find all doctors
        const doctors = await Doctor.find()
            .populate("userId", "full_name email phone profile_image");

        sendResponse(res, {
            message: "Doctors fetched successfully!",
            data: doctors,
            statusCode: 200,
        });
    }
);


//* GET SINGLE DOCTOR

export const getDoctorById = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find doctor by ID
        const doctor = await Doctor.findById(id)
            .populate("userId", "full_name email phone profile_image");

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        sendResponse(res, {
            message: "Doctor fetched successfully!",
            data: doctor,
            statusCode: 200,
        });
    }
);


//* UPDATE DOCTOR

export const updateDoctor = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const {
            specialization,
            qualification,
            license_number,
            experience,
        } = req.body;

        //* find doctor
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        //* update only provided fields
        if (specialization !== undefined) {
            doctor.specialization = specialization;
        }

        if (qualification !== undefined) {
            doctor.qualification = qualification;
        }

        if (license_number !== undefined) {
            doctor.license_number = license_number;
        }

        if (experience !== undefined) {
            doctor.experience = experience;
        }

        //* save updated doctor
        await doctor.save();

        const updatedDoctor = await Doctor.findById(id)
            .populate("userId", "full_name email phone profile_image");

        sendResponse(res, {
            message: "Doctor updated successfully!",
            data: updatedDoctor,
            statusCode: 200,
        });
    }
);


//* DELETE DOCTOR

export const deleteDoctor = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find and delete doctor profile
        const doctor = await Doctor.findByIdAndDelete(id);

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        sendResponse(res, {
            message: "Doctor profile deleted successfully!",
            data: null,
            statusCode: 200,
        });
    }
);


//* APPROVE DOCTOR

export const approveDoctor = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find doctor
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        //* approve doctor
        doctor.is_approved = true;

        await doctor.save();

        sendResponse(res, {
            message: "Doctor approved successfully!",
            data: doctor,
            statusCode: 200,
        });
    }
);
