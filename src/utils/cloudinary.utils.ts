
import cloudinary from "../config/cloudinary.config";
import AppError from "./appError.utils";
import fs from "fs";

export const uploadFileToCloudinary = async (
    file: Express.Multer.File,
    dir = "/profileimg"
) => {
    try {
        const folder = "hms" + dir;

        console.log("Starting Cloudinary upload...");
        console.log("File path:", file.path);

        // upload to cloud
        const { secure_url, public_id } =
            await cloudinary.uploader.upload(file.path, {
                folder: folder,
                unique_filename: true,
            });

        console.log("Cloudinary upload successful!");

        // delete file from local uploads folder
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
            console.log("Local file deleted successfully");
        }

        return {
            path: secure_url,
            public_id,
        };

    } catch (error) {
        console.log("Cloudinary upload error:", error);
        throw new AppError("Something went wrong while uploading image", 400);
    }
};


export const deleteFileFromCloudinary = async (
    public_id: string
) => {
    try {
        console.log("Starting Cloudinary deletion...");
        console.log("Public ID:", public_id);

        // delete file from cloudinary
        const result = await cloudinary.uploader.destroy(public_id);

        console.log("Cloudinary deletion result:", result);

        // check whether file was deleted successfully
        if (result.result !== "ok") {
            throw new AppError("Failed to delete image from Cloudinary", 400);
        }

        console.log("Cloudinary file deleted successfully");

        return result;

    } catch (error) {
        console.log("Cloudinary deletion error:", error);

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError("Something went wrong while deleting image", 400);
    }
};

