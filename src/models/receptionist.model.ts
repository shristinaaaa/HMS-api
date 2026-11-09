// receptionist.model.ts

import mongoose, { Document } from "mongoose";

interface IReceptionist extends Document {
    userId: mongoose.Types.ObjectId;
    employee_id: string;
    department?: string;
}

const receptionistSchema = new mongoose.Schema<IReceptionist>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    employee_id: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
    },
}, { timestamps: true });

const Receptionist = mongoose.model<IReceptionist>(
    "Receptionist",
    receptionistSchema
);

export default Receptionist;