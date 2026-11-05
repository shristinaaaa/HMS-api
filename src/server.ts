import app from "./app.js";
import http from "http";

const PORT=8080;

//*connect database

//*http server
const server=http.createServer(app);

//*listen
server.listen(PORT,()=>{
    console.log("server is runnig at http://localhost{PORT}");
});