import {inject, injectable} from "inversify";
import {Currency} from "../constant/constant";
import {Exchange, ExchangeRatio} from "../interfaces/exchangeInterface";
import TYPES from "../constant/identifiers";
@injectable()
export class ExchangeService implements Exchange {
    private _exchangeRepository: ExchangeRatio;
    public constructor(
        @inject(TYPES.ExchangeRatio) exchangeRepository: ExchangeRatio
    ) {
        this._exchangeRepository = exchangeRepository;
    }
    public exchange(
        source: Currency,
        target: Currency,
        amount: number
    ): string {
        const exchangeRatio = this._exchangeRepository.getExchangeRatio(
            source,
            target
        );
        const exchangedAmount = Math.round(exchangeRatio * amount * 100) / 100;
        const formatter = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        const formmatedResult = formatter.format(exchangedAmount);
        return formmatedResult.slice(1, formmatedResult.length);
    }
}
