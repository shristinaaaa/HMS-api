
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";
import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../utils/cloudinary.utils";


//* GET ALL USERS

export const getAllUsers = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        //* find all users
        const users = await User.find().select("-password");

        sendResponse(res, {
            message: "Users fetched successfully!",
            data: users,
            statusCode: 200,
        });
    }
);


//* GET SINGLE USER

export const getUserById = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find user by ID
        const user = await User.findById(id).select("-password");

        if (!user) {
            throw new AppError("User not found", 404);
        }

        sendResponse(res, {
            message: "User fetched successfully!",
            data: user,
            statusCode: 200,
        });
    }
);


//* UPDATE USER

export const updateUser = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find user by ID
        const user = await User.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        //* upload new image
        const file = req.file;

        if (file) {

            const { path, public_id } =
                await uploadFileToCloudinary(file);

            //* delete old image
            if (user.profile_image?.public_id) {
                await deleteFileFromCloudinary(
                    user.profile_image.public_id
                );
            }

            //* replace old image with new image
            user.profile_image = {
                path,
                public_id
            };
        }

        //* update other user fields (only allowed fields)
        const { full_name, email, phone } = req.body;

        if (full_name !== undefined) user.full_name = full_name;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;

        //* save updated user
        await user.save();

        sendResponse(res, {
            message: "User updated successfully!",
            data: user,
            statusCode: 200,
        });
    }
);



//* DELETE USER

export const deleteUser = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        //* find and delete user
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        sendResponse(res, {
            message: "User deleted successfully!",
            data: null,
            statusCode: 200,
        });
    }
);


//* ACTIVATE / DEACTIVATE USER

export const updateUserStatus = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;
        const { is_active } = req.body;

        if (typeof is_active !== "boolean") {
            throw new AppError("is_active must be true or false", 400);
        }

        //* update account status
        const user = await User.findByIdAndUpdate(
            id,
            { is_active },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            throw new AppError("User not found", 404);
        }

        sendResponse(res, {
            message: is_active
                ? "User activated successfully!"
                : "User deactivated successfully!",
            data: user,
            statusCode: 200,
        });
    }
);
