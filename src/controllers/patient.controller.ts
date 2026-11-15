
import { Request, Response, NextFunction } from "express";
import Patient from "../models/patient.model";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";


//* CREATE PATIENT

export const createPatient = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const {
            userId,
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
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

        //* check whether patient profile already exists
        const existingPatient = await Patient.findOne({ userId });

        if (existingPatient) {
            throw new AppError("Patient profile already exists", 409);
        }

        //* create patient
        const patient = await Patient.create({
            userId,
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
        });

        sendResponse(res, {
            message: "Patient profile created successfully!",
            data: patient,
            statusCode: 201,
        });
    }
);


//* GET ALL PATIENTS

export const getAllPatients = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        //* find all patients
        const patients = await Patient.find()
            .populate("userId", "full_name email phone");

        sendResponse(res, {
            message: "Patients fetched successfully!",
            data: patients,
            statusCode: 200,
        });
    }
);


//* GET SINGLE PATIENT

export const getPatientById = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find patient using patient document ID
        const patient = await Patient.findById(id)
            .populate("userId", "full_name email phone");

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        sendResponse(res, {
            message: "Patient fetched successfully!",
            data: patient,
            statusCode: 200,
        });
    }
);


//* UPDATE PATIENT

export const updatePatient = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const {
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
        } = req.body;

        //* find and update patient
        const patient = await Patient.findByIdAndUpdate(
            id,
            {
                date_of_birth,
                gender,
                blood_group,
                address,
                emergency_contact,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("userId", "full_name email phone");

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        sendResponse(res, {
            message: "Patient updated successfully!",
            data: patient,
            statusCode: 200,
        });
    }
);


//* DELETE PATIENT

export const deletePatient = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find and delete patient
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        sendResponse(res, {
            message: "Patient deleted successfully!",
            data: null,
            statusCode: 200,
        });
    }
);
