
import z from "zod";

//* LOGIN
export const loginvalidatorschema = z.object({

    // body
    body: z.object({
        email: z.email("invalid email"),

        password: z.string("password is required")
            .min(1, "password is required"),
    }),

    // params
    params: z.object({}),

    // query
    query: z.object({}),
});


//* REGISTER
export const registervalidatorschema = z.object({

    // body
    body: z.object({

        // Common user fields
        full_name: z.string("fullname is required")
            .trim()
            .min(1, "fullname is required"),

        email: z.email("invalid email"),

        password: z.string("password is required")
            .min(1, "password is required")
            .regex(/[A-Z]/, "password must have at least one uppercase letter")
            .regex(/[a-z]/, "password must have at least one lowercase letter"),

        phone: z.string().optional(),

        role: z.string().optional(),

        // Patient fields
        date_of_birth: z.string().optional(),

        gender: z.string().optional(),

        blood_group: z.string().optional(),

        address: z.string().optional(),

        emergency_contact: z.string().optional(),

        // Doctor fields
        specialization: z.string().optional(),

        qualification: z.string().optional(),

        license_number: z.string().optional(),

        experience: z.string().optional(),

    }),

    // params
    params: z.object({}),

    // query
    query: z.object({}),
});


//* CHANGE PASSWORD
export const changepasswordvalidatorschema = z.object({

    // body
    body: z.object({

        oldpassword: z.string("old password is required")
            .min(1, "old password is required"),

        newpassword: z.string("new password is required")
            .min(1, "new password is required")
            .regex(/[A-Z]/, "password must have at least one uppercase letter")
            .regex(/[a-z]/, "password must have at least one lowercase letter"),

    }),

    // params
    params: z.object({}),

    // query
    query: z.object({}),
});
