import winston from "winston";
import path from "path";

import config from "../../config";
import * as correlationId from "../correlation/correlationId";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format((info) => {
            info.correlationId = correlationId.getId();
            return info;
        })(),
        winston.format.timestamp(),
        winston.format.errors({stack: true}),
        winston.format.colorize(),
        winston.format.printf(({timestamp, correlationId, level, message}) => {
            return correlationId ? `${timestamp} [${config.correlationId.headerName}: ${correlationId}] - ${level}: ${message}`
                : `${timestamp} - ${level}: ${message}`;
        })
    ),
    level: "info",
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});

export default logger;