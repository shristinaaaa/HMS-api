import mongoose, { Document } from "mongoose"
import { IImage } from "../types/global.types";
import imageschema from "./image.model";

enum Role{
    PATIENT="Patient",
    ADMIN="Admin",
}

interface Ipatient extends Document{
    fullname:string;
    email:string;
    password:string;
    role:Role;
    profile_image?:IImage;
    phone?:string;
    is_active:boolean;
    createdAt:Date;
    updatedAt:Date;
}

const patientSchema=new mongoose.Schema<Ipatient>({
    fullname:{
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

const Patient= mongoose.model<Ipatient>("Patient",patientSchema);

export default Patient