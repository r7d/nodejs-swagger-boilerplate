import {Request, Response, NextFunction} from "express";
import config from "../../config";
import * as correlator from "./correlationId";

export const correlationIdMiddleware = function(req: Request, res: Response, next: NextFunction) {
    correlator.bindEmitter(req);
    correlator.bindEmitter(res);
    correlator.bindEmitter(req.socket);

    correlator.withId(() => {
        const currentCorrelationId = correlator.getId();
        res.set(config.correlationId.headerName, currentCorrelationId);
        next();
    }, req.get(config.correlationId.headerName));
};