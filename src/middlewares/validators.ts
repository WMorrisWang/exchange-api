import {validatorWrapper} from "./util";
import {exchangeSchema} from "../validationSchemas/exchangeValidationSchema";

export const exchangeValidator = validatorWrapper(exchangeSchema);
