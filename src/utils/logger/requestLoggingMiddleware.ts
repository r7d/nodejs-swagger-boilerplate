import morgan from "morgan";
import logger from "./logger";

const morganConfig = {
    stream: {
        write: (text: string) => logger.info(text.trim()),
    },
};

export const requestLoggingMiddleware = [
    morgan("[REQ] :method :url", {...morganConfig, immediate: true}),
    morgan("[RES] :method :status :url (:res[content-length] bytes) :response-time ms", {...morganConfig, immediate: false}),
];