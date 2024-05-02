import type {Schema} from "express-validator/src/middlewares/schema";
import type {Request, Response, NextFunction} from "express";
import type {Middleware} from "inversify-express-utils";
import {checkSchema, validationResult} from "express-validator";

export const validatorWrapper = (schema: Schema) =>
    [
        checkSchema(schema),
        (req: Request, res: Response, next: NextFunction) => {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({error: error.array()});
            }
            next();
        },
    ] as Array<Middleware>;
