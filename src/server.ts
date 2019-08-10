import http from "http";
import config from "./config";
import initApp from "./app";
import logger from "./utils/logger";

initApp()
    .then(app => {
        const server = http.createServer(app);

        server.listen(config.server.port, () => {
            console.log(`App is running at http://localhost:${config.server.port} in ${config.env} mode`);
            console.log("Press CTRL-C to stop\n");
        });
    })
    .catch(err => {
        logger.error(err.stack);
        process.exit(1);
    });