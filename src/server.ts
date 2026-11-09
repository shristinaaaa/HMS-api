import http from "http";
import app from "./app";
import connectDatabase from "./config/db.config";

const PORT = 8080;
const DB_URI='mongodb://localhost:27017/hms';

connectDatabase(DB_URI);

const server=http.createServer(app);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
