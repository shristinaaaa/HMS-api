import { NextFunction, Request, RequestHandler, Response } from "express";

//* Handles async errors by passing them to the Express error-handling middleware
export const catchasync = (fn: RequestHandler) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error)); 
    };
};
       