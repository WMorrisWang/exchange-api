import type {Schema} from "express-validator/src/middlewares/schema";

import {AVAILABLE_CURRENCIES} from "../constant/constant";

export const exchangeSchema: Schema = {
    source: {
        in: "query",
        notEmpty: {
            bail: true,
            errorMessage: "source required",
        },
        isIn: {
            bail: true,
            options: [AVAILABLE_CURRENCIES],
            errorMessage: "Invalid currency input",
        },
    },
    target: {
        in: "query",
        notEmpty: {
            bail: true,
            errorMessage: "target required",
        },
        isIn: {
            bail: true,
            options: [AVAILABLE_CURRENCIES],
            errorMessage: "Invalid currency input",
        },
    },
    amount: {
        in: "query",
        notEmpty: {
            bail: true,
            errorMessage: "amount required",
        },
        isCurrency: {
            bail: true,
            errorMessage: "invalid amount input",
        },
        custom: {
            bail: true,
            options: (value: string) => {
                const re = new RegExp(/^(\d)/);
                return re.test(value);
            },
            errorMessage: "invalid amount input",
        },
        customSanitizer: {
            options: (value: string) => {
                return value.replace(/\,/g, "");
            },
        },
    },
};
