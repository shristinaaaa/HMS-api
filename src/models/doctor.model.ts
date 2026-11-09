// doctor.model.ts

import mongoose, { Document } from "mongoose";

interface IDoctor extends Document {
    userId: mongoose.Types.ObjectId;
    specialization: string;
    qualification: string;
    license_number: string;
    experience?: number;
}

const doctorSchema = new mongoose.Schema<IDoctor>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    license_number: {
        type: String,
        required: true,
        unique: true,
    },
    experience: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;