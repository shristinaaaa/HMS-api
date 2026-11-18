
import { NextFunction, Request, Response } from "express";

import User from "../models/user.model";
import Patient from "../models/patient.model";
import Doctor from "../models/doctor.model";

import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendresponse.utils";
import { catchasync } from "../utils/catchasync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import ENV_CONFIG from "../config/env.config";

import { Role } from "../types/enum.types";
import { uploadFileToCloudinary } from "../utils/cloudinary.utils";



//* REGISTER

export const register = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const {
            full_name,
            email,
            password,
            phone,
            role,

            //* patient fields
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,

            //* doctor fields
            specialization,
            qualification,
            license_number,
            experience,

        } = req.body;

        const file=req.file;

        //* check required fields

        if (!full_name) {
            throw new AppError("Fullname is required", 400);
        }

        if (!email) {
            throw new AppError("Email is required", 400);
        }

        if (!password) {
            throw new AppError("Password is required", 400);
        }


        //* determine role
        //* if role is not provided, default to patient

        const userRole = (
            typeof role === "string"
                ? role.toLowerCase()
                : Role.PATIENT
        ) as Role;


        //* only patient and doctor registration allowed

        if (
            userRole !== Role.PATIENT &&
            userRole !== Role.DOCTOR
        ) {
            throw new AppError(
                "Invalid registration role",
                400
            );
        }


        //* check doctor-specific fields

        if (userRole === Role.DOCTOR) {

            if (
                !specialization ||
                !qualification ||
                !license_number
            ) {
                throw new AppError(
                    "Specialization, qualification and license number are required for doctors",
                    400
                );
            }

        }


        //* hash password

        const hash = await hashPassword(password);


        //* create user instance

        const user = new User({
            full_name,
            email,
            phone,
            password: hash,
            role: userRole
        });


        //*upload profileimage

        if (file) {

        const {path,public_id}=await uploadFileToCloudinary(file,"/profileimg");

        user.profile_image = {
        path,
        public_id
         };
        }

        //* save user

        await user.save();


        try {

            //* if patient, create patient profile

            if (userRole === Role.PATIENT) {

                await Patient.create({
                    userId: user._id,
                    date_of_birth,
                    gender,
                    blood_group,
                    address,
                    emergency_contact,
                });

            }


            //* if doctor, create doctor profile

            else if (userRole === Role.DOCTOR) {

                await Doctor.create({
                    userId: user._id,
                    specialization,
                    qualification,
                    license_number,
                    experience,

                    //* doctor must wait for admin approval
                    is_approved: false,
                });

            }


        } catch (error) {

            //* if profile creation fails,
            //* delete the user created above

            await User.findByIdAndDelete(user._id);

            throw error;
        }


        //* remove password from response

        const { password: _, ...rest } = user.toObject();


        //* send response

        sendResponse(res, {
            message:
                userRole === Role.DOCTOR
                    ? "Doctor registration submitted. Waiting for admin approval."
                    : "Patient registered successfully!",

            data: rest,
            statusCode: 201,
        });

    }
);


//* LOGIN

export const login = catchasync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { email, password } = req.body;


        //* check email

        if (!email) {
            throw new AppError("Email is required", 400);
        }


        //* check password

        if (!password) {
            throw new AppError("Password is required", 400);
        }


        //* find user
        //* password is select:false in user model
        //* so explicitly select it

        const user = await User.findOne({ email })
            .select("+password");


        if (!user) {
            throw new AppError(
                "Credentials don't match in our database",
                400
            );
        }


        //* compare password

        const isPasswordMatched = await comparePassword(
            password,
            user.password
        );


        if (!isPasswordMatched) {
            throw new AppError(
                "Password doesn't match",
                400
            );
        }


        //* check whether account is active

        if (!user.is_active) {
            throw new AppError(
                "Your account is inactive",
                403
            );
        }


        //* generate JWT token

        const access_token = generateJwtToken({
            _id: user._id,
            email: user.email,
            role: user.role,
        });


        //* remove password from response

        const { password: _, ...rest } = user.toObject();


        //* set cookie

        res.cookie("access_token", access_token, {
            secure: ENV_CONFIG.NODE_ENV !== "development",
            httpOnly: true,
            expires: new Date(
                Date.now() +
                ENV_CONFIG.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            sameSite:
                ENV_CONFIG.NODE_ENV === "development"
                    ? "lax"
                    : "none",
        });


        //* send response

        sendResponse(res, {
            message: "Login Success!",
            data: {
                user: rest,
                access_token,
            },
            statusCode: 200,
        });

    }
);


//* CHANGE PASSWORD

//* CHANGE EMAIL

//* UPDATE PROFILE IMAGE
