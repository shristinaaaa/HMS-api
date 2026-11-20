import app from "./app";
import connectDatabase from "./config/db.config";
import ENV_CONFIG from "./config/env.config";

const PORT = ENV_CONFIG.PORT;

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => { //.listen creates an underlying HTTP server and starts listening for incoming requests on the specified port.
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log("Server failed to start:", error);
        process.exit(1);
    }
};

startServer();