
import mongoose from "mongoose";
import { Role } from "../types/enum.types";
import jwt, { JwtPayload } from "jsonwebtoken";
import ENV_CONFIG from "../config/env.config";


export interface IJwtPayload {
    _id: mongoose.Types.ObjectId;
    role: Role;
    email: string;
}


export interface IJwtReturn extends IJwtPayload {
    iat: number;
    exp: number;
}


export const generateJwtToken = (payload: IJwtPayload) => {

    try {

        return jwt.sign(payload, ENV_CONFIG.JWT_SECRET as any, {
            expiresIn: ENV_CONFIG.JWT_EXPIRES_IN as any,
        });

    } catch (error) {

        console.log(error);
        throw error;

    }
};


export const verifyToken = (token: string): IJwtReturn => {

    try {

        const decoded = jwt.verify(token, ENV_CONFIG.JWT_SECRET!) as JwtPayload;

        if (typeof decoded === "string") {
            throw new Error("Invalid token payload");
        }

        return decoded as IJwtReturn;

    } catch (error) {

        console.log(error);
        throw error;

    }
};
