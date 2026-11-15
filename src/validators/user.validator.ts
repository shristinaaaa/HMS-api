
import z from "zod";

// UPDATE USER
export const updateuservalidatorschema = z.object({
    body: z.object({
        full_name: z.string()
            .min(3, "Full name must be at least 3 characters")
            .optional(),

        phone: z.string().optional(),
    }).refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required to update"
    ),

    params: z.object({
        id: z.string().min(1, "User ID is required"),
    }),

    query: z.object({}),
});

// ACTIVATE / DEACTIVATE USER
export const updateuserstatusvalidatorschema = z.object({
    body: z.object({
        is_active: z.boolean({
            error: "is_active must be true or false",
        }),
    }),

    params: z.object({
        id: z.string().min(1, "User ID is required"),
    }),

    query: z.object({}),
});
