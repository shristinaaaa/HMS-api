
import { ZodObject } from "zod";
import AppError from "../utils/appError.utils";
import { Request, NextFunction, Response } from "express";

//* VALIDATOR MIDDLEWARE

export const validate = (schema: ZodObject) => {

    return (req: Request, res: Response, next: NextFunction) => {

        //* validate body, params and query

        const result = schema.safeParse({

            body: req.body,

            params: req.params,

            query: req.query,

        });


        //* if validation fails

        if (result.error) {

            const errors = result.error.issues.map((issue) => {

                return {
                    message: issue.message,

                    path: issue.path.join("."),
                };

            });

            next(
                new AppError(
                    errors[0]?.message ?? "Validation failed",
                    400,
                    errors
                )
            );

            return;
        }


        //* replace original request data with validated data

        req.body = result.data.body;

        Object.assign(req.params, result.data.params);

        Object.assign(req.query, result.data.query);


        //* move to next middleware

        next();

    };

};
