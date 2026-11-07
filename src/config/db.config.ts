import mongoose from "mongoose";

const connectDatabase=(DB_URI:string)=>{
    mongoose.connect(DB_URI).then(()=>{
        console.log("Database Connected");
    }).catch((error)=>{
        console.log("Database Connection Error");
    });
};

export default connectDatabase;