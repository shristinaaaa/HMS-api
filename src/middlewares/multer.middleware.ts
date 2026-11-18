
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import { Request } from "express";
import path from "path";
import AppError from "../utils/appError.utils";

const multerFileUploader = () => {
    const folder = "uploads/";
    const maxFileSize = 5 * 1024 * 1024; // 5mb

    const allowedExts = [".png", ".jpg", ".svg", ".jpeg", ".webp"];

    const allowedMimeTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/svg+xml",
    ];

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    //*disk Storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },

        filename: (req: Request, file: Express.Multer.File, cb) => {
            const filename = Date.now() + file.originalname;
            cb(null, filename);
        },
    });

    //*file filter
    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {

        // Check file extension
        if (!allowedExts.includes(
            path.extname(file.originalname).toLowerCase()
        )) {
            const message = `Invalid file extension. Only ${allowedExts.join(", ")} are accepted`;

            cb(new AppError(message, 400));
            return;
        }

        // Check MIME type
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new AppError("Invalid file type", 400));
            return;
        }

        // Accept the file
        cb(null, true);
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: maxFileSize,
        },
    });

    return upload;
};

export default multerFileUploader;
