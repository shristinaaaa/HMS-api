
import multer from "multer";
import fs from "fs";
import { Request } from "express";

const multerFileUploader = () => {
    const folder = "uploads/";
    const maxFileSize=5*1024*1024;//5mb

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },

        filename: (req: Request, file: Express.Multer.File, cb) => {
            const filename = Date.now() + file.originalname;
            cb(null, filename);
        },
    });

    const upload = multer({
        storage: storage,
    });

    return upload;
};

export default multerFileUploader;
