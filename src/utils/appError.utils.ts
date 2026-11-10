//AppError class banauna using predefined class Error


class AppError extends Error {
    public status: "error" | "fail";
    public success: boolean;

    constructor(
        public message: string,
        public statusCode: number,
    ) {
        super(message);
        this.statusCode = statusCode;
        // this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";
        this.success = false;
        Error.captureStackTrace(this, AppError);//stack trace tells us where an error happened and which functions were involved in reaching that error.
    }
}

export default AppError;
