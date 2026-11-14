//Zod lets you describe what your incoming data should look like.

import z from "zod";

//* login
export const loginvalidatorschema = z.object({
    // body
    body: z.object({
        email: z.email("invalid email"),
        password: z.string("password is required"),
    }),

    // params
    params: z.object({}),

    // query
    query: z.object({}),
});


//* register
export const registervalidatorschema = z.object({
    // body
    body: z.object({
        email: z.email("invalid email"),
        password: z.string("password is required")
            .regex(/[A-Z]/, "password must have at least one uppercase letter")
            .regex(/[a-z]/, "password must have at least one lowercase letter"),
    }),

    // params
    params: z.object({}),

    // query
    query: z.object({}),
});


//* change password
export const changepasswordvalidatorschema = z.object({
    // body
    body: z.object({
        oldpassword: z.string("old password is required"),

        newpassword: z.string("new password is required")
            .regex(/[A-Z]/, "password must have at least one uppercase letter")
            .regex(/[a-z]/, "password must have at least one lowercase letter"),
    }),

    // params
    params: z.object({}),

    // query
    query: z.object({}),
});
