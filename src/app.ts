
import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler.middleware";

//*importing routes
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json({limit:'10mb'}));

//*using routes
app.use("/api/v1/ auth",authRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message:'server is up and running',
        status:'success',
        success:'true',
        data:null,
    })
});

//path not found middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    const message = `cant use ${req.method} on ${req.path}`;
    const error:any = new Error(message); //js ko Error constructor use garera error banayem 
    error.statusCode=404;
    error.status='fail';
    error.success=false;
    next(error);//skips normal middleware and routes and looks for the next error-handling middleware i.e tala use vako errorHandler func.
})

//error handler middleware
app.use(errorHandler);


export default app;
