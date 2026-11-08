import mongoose from "mongoose";
import { IImage } from "../types/global.types";


const imageschema=new mongoose.Schema<IImage>(
    {
        path:{
        type:String,
        required:[true,"image path is required"],
    },
    public_id:{
        type:String,
        required:[true,"Public id is required"],
    },
    },
    {
        _id:false,//image's public ID for image hosting services such as Cloudinary.
    }
    
);

export default imageschema; 