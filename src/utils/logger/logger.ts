import winston from "winston";
import path from "path";

import config from "../../config";
import * as correlationId from "../correlation/correlationId";

const noCorrelationIdValue = "no-correlation";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format((info) => {
            info.correlationId = correlationId.getId() || noCorrelationIdValue;
            return info;
        })(),
        winston.format.timestamp(),
        winston.format.errors({stack: true}),
        winston.format.colorize(),
        winston.format.printf(({timestamp, correlationId, level, message}) => {
            return `${timestamp} [${config.correlationId.headerName}: ${correlationId}] - ${level}: ${message}`;
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