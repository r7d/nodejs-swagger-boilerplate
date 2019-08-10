import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import multer from "multer";

import {requestLoggingMiddleware} from "./utils/logger/requestLoggingMiddleware";
import {correlationIdMiddleware}  from "./utils/correlation/expressCorrelationIdMiddleware";
import {initSwaggerMiddlware} from "./utils/swagger/expressSwaggerMiddleware";

const intiApp = async function() {
    const app = express();

    app.disable("x-powered-by");
    
    app.use(correlationIdMiddleware);
    app.use(requestLoggingMiddleware);

    app.use(bodyParser.json({
        strict: false
    }));

    const upload = multer();
    app.use(upload.any()); // allow unlimited number of files with a request    
    
    try {
        await initSwaggerMiddlware(app);
    } catch (err) {
        console.log("init middleware", err);
        process.exit(1);
    }

    // app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    //     if (err) {
    //         const errStr = err.message || err.toString();
    //         const errMsg = { message: errStr, extra: err };
    //         if (res.statusCode < 400) {
    //             res.status(500);
    //         }
    //         res.json(errMsg);
    //     }
    // });    
    
    app.get("/ping", (req: Request, res: Response) => {
        const upTime = Math.floor(process.uptime());
        res.json({
            status: "ok",
            upTime
        });
    });

    return app;
};

export default intiApp;