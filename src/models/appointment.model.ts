import mongoose from "mongoose";



interface IAppointment extends Document{
    patientID:mongoose.Types.ObjectId;
    doctorID:mongoose.Types.ObjectId;
    appointment_date:Date;
    appointment_time:String;
    reason:string;
    status:string;
    notes?:string;

}

const appointmentSchema=new mongoose.Schema<IAppointment>({
    patientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patiennt",
        required:true,
    },
    doctorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        require:true,
    },
    appointment_date:{
        type:Date,
        required:true,
    },
    appointment_time:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","rejeted","cancelled","completed"],
        default:"pending",
    },
    notes:{
        type:String,
    },
},
{timestamps:true});

const Appointment=mongoose.model<IAppointment>(
    "Appointment",appointmentSchema
);

export default Appointment