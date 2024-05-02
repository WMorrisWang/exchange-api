import type {Request, Response, NextFunction} from "express";

import dotenv from "dotenv";
import "reflect-metadata";
import {InversifyExpressServer} from "inversify-express-utils";

import container from "./ioc_container";

dotenv.config();
const server = new InversifyExpressServer(container);
server.setErrorConfig(app => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Internal server error");
    });
});
export const app = server.build();
