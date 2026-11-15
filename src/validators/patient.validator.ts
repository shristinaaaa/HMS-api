
import z from "zod";

// UPDATE PATIENT
export const updatepatientvalidatorschema = z.object({
    body: z.object({
        date_of_birth: z.coerce.date().optional(),
        gender: z.string().optional(),
        blood_group: z.string().optional(),
        address: z.string().optional(),
        emergency_contact: z.string().optional(),
    }).refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required to update"
    ),

    params: z.object({
        id: z.string().min(1, "Patient ID is required"),
    }),

    query: z.object({}),
});
