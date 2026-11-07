import mongoose, { Document } from "mongoose"

enum Role{
    PATIENT="Patient",
    ADMIN="Admin",
}

interface Ipatient extends Document{
    fullname:string;
    email:string;
    password:string;
    role:Role;
    profile_image:string;
}

const patientSchema=new mongoose.Schema<Ipatient>({},{timestamps:true});

const Patient= mongoose.model<Ipatient>("Patient",patientSchema);

export default Patient