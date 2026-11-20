
import { Request, Response, NextFunction } from "express";
import Receptionist from "../models/receptionist.model";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";
import { Role } from "../types/enum.types";


//* CREATE RECEPTIONIST

export const createReceptionist = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const {
            userId,
            employee_id,
            department,
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
        if (user.role !== Role.RECEPTIONIST) {
            throw new AppError("User is not registered as a receptionist", 400);
        }

        //* check whether receptionist profile already exists
        const existingReceptionist = await Receptionist.findOne({ userId });

        if (existingReceptionist) {
            throw new AppError("Receptionist profile already exists", 409);
        }

        //* create receptionist
        const receptionist = await Receptionist.create({
            userId,
            employee_id,
            department,
        });

        sendResponse(res, {
            message: "Receptionist created successfully!",
            data: receptionist,
            statusCode: 201,
        });
    }
);


//* GET ALL RECEPTIONISTS

export const getAllReceptionists = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        //* find all receptionists
        const receptionists = await Receptionist.find()
            .populate("userId", "full_name email phone profile_image");

        sendResponse(res, {
            message: "Receptionists fetched successfully!",
            data: receptionists,
            statusCode: 200,
        });
    }
);


//* GET SINGLE RECEPTIONIST

export const getReceptionistById = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find receptionist by ID
        const receptionist = await Receptionist.findById(id)
            .populate("userId", "full_name email phone profile_image");

        if (!receptionist) {
            throw new AppError("Receptionist not found", 404);
        }

        sendResponse(res, {
            message: "Receptionist fetched successfully!",
            data: receptionist,
            statusCode: 200,
        });
    }
);


//* UPDATE RECEPTIONIST

export const updateReceptionist = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const {
            employee_id,
            department,
        } = req.body;

        //* find receptionist
        const receptionist = await Receptionist.findById(id);

        if (!receptionist) {
            throw new AppError("Receptionist not found", 404);
        }

        //* update only provided fields
        if (employee_id !== undefined) {
            receptionist.employee_id = employee_id;
        }

        if (department !== undefined) {
            receptionist.department = department;
        }

        //* save updated receptionist
        await receptionist.save();

        const updatedReceptionist = await Receptionist.findById(id)
            .populate("userId", "full_name email phone profile_image");

        sendResponse(res, {
            message: "Receptionist updated successfully!",
            data: updatedReceptionist,
            statusCode: 200,
        });
    }
);


//* DELETE RECEPTIONIST

export const deleteReceptionist = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find and delete receptionist
        const receptionist = await Receptionist.findByIdAndDelete(id);

        if (!receptionist) {
            throw new AppError("Receptionist not found", 404);
        }

        sendResponse(res, {
            message: "Receptionist deleted successfully!",
            data: null,
            statusCode: 200,
        });
    }
);
