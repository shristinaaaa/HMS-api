
import z from "zod";

// UPDATE DOCTOR PROFILE
export const updatedoctorvalidatorschema = z.object({
    body: z.object({
        specialization: z.string().optional(),
        qualification: z.string().optional(),
        license_number: z.string().optional(),
        experience: z.coerce.number().min(0).optional(),
    }).refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required to update"
    ),

    params: z.object({
        id: z.string().min(1, "Doctor ID is required"),
    }),

    query: z.object({}),
});

// APPROVE DOCTOR
export const approvedoctorvalidatorschema = z.object({
    body: z.object({}),

    params: z.object({
        id: z.string().min(1, "Doctor ID is required"),
    }),

    query: z.object({}),
});
