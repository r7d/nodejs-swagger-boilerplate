import express from "express";
import { Request, Response } from "express";

import {requestLoggingMiddleware} from "./utils/logger/requestLoggingMiddleware";
import {correlationIdMiddleware}  from "./utils/correlation/expressCorrelationIdMiddleware";

const app = express();

app.disable("x-powered-by");

app.use(correlationIdMiddleware);
app.use(requestLoggingMiddleware);

app.get("/ping", (req: Request, res: Response) => {
    const upTime = Math.floor(process.uptime());
    res.json({
        status: "ok",
        upTime
    });
});

export default app;