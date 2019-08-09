import http from "http";
import config from "./config";
import app from "./app";

const server = http.createServer(app);

server.listen(config.server.port, () => {
    console.log(`App is running at http://localhost:${config.server.port} in ${config.env} mode`);
    console.log("Press CTRL-C to stop\n");
});    

export default server;