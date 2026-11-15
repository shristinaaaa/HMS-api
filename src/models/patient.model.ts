
import mongoose, { Document } from "mongoose";

interface IPatient extends Document {
    userId: mongoose.Types.ObjectId;
    date_of_birth?: Date;
    gender?: string;
    blood_group?: string;
    address?: string;
    emergency_contact?: string;
}

const patientSchema = new mongoose.Schema<IPatient>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    date_of_birth: {
        type: Date,
    },

    gender: {
        type: String,
    },

    blood_group: {
        type: String,
    },

    address: {
        type: String,
    },

    emergency_contact: {
        type: String,
    },

}, { timestamps: true });

const Patient = mongoose.model<IPatient>("Patient", patientSchema);

export default Patient;
