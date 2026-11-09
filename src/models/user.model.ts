import mongoose, { Document } from "mongoose"
import { IImage } from "../types/global.types";
import imageschema from "./image.model";
import { Role } from "../types/enum.types";


interface IUser extends Document{
    full_name:string;
    email:string;
    password:string;
    role:Role;
    profile_image?:IImage;
    phone?:string;
    is_active:boolean;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema=new mongoose.Schema<IUser>({
    full_name:{
        type:String,
        required:[true,"fullname is required"],
        minlength:3,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.PATIENT,
    },
    profile_image:{
        type: imageschema,
        default: null,
    },
    phone:{
        type:String,
        minlength:10,
        maxlength:15,
        default:null,
    },
    is_active:{
        type:Boolean,
        default:true,
    }
    
},{timestamps:true});

const User= mongoose.model<IUser>("User",userSchema);

export default User