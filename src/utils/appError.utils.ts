//AppError class banauna using predefined class Error
//standard error object banauna jun error handler middleware ma janxa

class AppError extends Error {
    public status: "error" | "fail";
    public success: boolean;

    constructor(
        public message: string,
        public statusCode: number,
        public details?:{message:string,path:string}[],
    ) {
        super(message);
        this.statusCode = statusCode;
        // this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";
        this.success = false;
        this.details=details;
        Error.captureStackTrace(this, AppError);//stack trace tells us where an error happened and which functions were involved in reaching that error.
    }
}

export default AppError;
