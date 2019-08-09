import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import {config as common} from "./components/common";
import {config as server} from "./components/server";
import {config as logger} from "./components/logger";

export default Object.assign({}, common, logger, server);