import mongoose from "mongoose";
import ENV_CONFIG from "./env.config";

const connectDatabase = async () => {
    try {
        await mongoose.connect(ENV_CONFIG.DB_URI!);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connection Error:", error);
        throw error;
    }
};

export default connectDatabase;