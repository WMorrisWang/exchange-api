import {Currency} from "../constant/constant";

export interface ExchangeRatio {
    getExchangeRatio(source: Currency, target: Currency): number;
}
