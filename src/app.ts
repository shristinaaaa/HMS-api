
import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import AppError from "./utils/appError.utils";
import cookieParser from "cookie-parser";
//*importing route
import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(express.json({limit:'10mb'}));
app.use("/api/v1/uploads",express.static("uploads"));//makes the uploads folder publicly accessible,uploads bhitra subfolders lai ni yei line le kaam garxa


// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message:'server is up and running',
        status:'success',
        success:'true',
        data:null,
    });
});

//using routes
app.use("/api/v1",routes);

//path not found middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    const message = `cant use ${req.method} on ${req.path}`;
    next(new AppError(message,404));
});

//error handler middleware
app.use(errorHandler);


export default app;
