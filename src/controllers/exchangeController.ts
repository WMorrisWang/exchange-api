import type {Request, Response} from "express";
import {
    interfaces,
    controller,
    httpGet,
    request,
    response,
} from "inversify-express-utils";
import {inject} from "inversify";
import {exchangeValidator} from "../middlewares/validators";
import {Currency} from "../constant/constant";
import {Exchange} from "../interfaces/exchangeInterface";
import TYPES from "../constant/identifiers";
@controller("/v1/exchange")
export class ExchangeController implements interfaces.Controller {
    private _exchangeService: Exchange;
    constructor(@inject(TYPES.Exchange) exchangeService: Exchange) {
        this._exchangeService = exchangeService;
    }
    @httpGet("/", ...exchangeValidator)
    private exchange(@request() req: Request, @response() res: Response): void {
        const {source, target, amount} = req.query;
        res.status(200).json({
            msg: "success",
            amount: this._exchangeService.exchange(
                source as Currency,
                target as Currency,
                Number.parseFloat(amount as string)
            ),
        });
    }
}
