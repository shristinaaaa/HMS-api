
import mongoose from "mongoose";
import z from "zod";

// CREATE DOCTOR
export const createdoctorvalidatorschema = z.object({
    body: z.object({
        userId: z.string().refine(
            (id) => mongoose.Types.ObjectId.isValid(id),
            "Invalid User ID"
        ),

        specialization: z.string().min(1, "Specialization is required"),

        qualification: z.string().min(1, "Qualification is required"),

        license_number: z.string().min(1, "License number is required"),

        experience: z.coerce.number().min(0).optional(),
    }),

    params: z.object({}),
    query: z.object({}),
});

// UPDATE DOCTOR
export const updatedoctorvalidatorschema = z.object({
    body: z.object({
        specialization: z.string().min(1).optional(),
        qualification: z.string().min(1).optional(),
        license_number: z.string().min(1).optional(),
        experience: z.coerce.number().min(0).optional(),
    }).refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required to update"
    ),

    params: z.object({
        id: z.string().refine(
            (id) => mongoose.Types.ObjectId.isValid(id),
            "Invalid Doctor ID"
        ),
    }),

    query: z.object({}),
});

// APPROVE DOCTOR
export const approvedoctorvalidatorschema = z.object({
    body: z.object({}),

    params: z.object({
        id: z.string().refine(
            (id) => mongoose.Types.ObjectId.isValid(id),
            "Invalid Doctor ID"
        ),
    }),

    query: z.object({}),
});

// VALIDATE DOCTOR ID
export const doctoridvalidatorschema = z.object({
    body: z.object({}),

    params: z.object({
        id: z.string().refine(
            (id) => mongoose.Types.ObjectId.isValid(id),
            "Invalid Doctor ID"
        ),
    }),

    query: z.object({}),
});
