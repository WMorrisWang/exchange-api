import {Currency} from "../constant/constant";

export interface ExchangeRatio {
    getExchangeRatio(source: Currency, target: Currency): number;
}

export interface Exchange {
    exchange(source: Currency, target: Currency, amount: number): string;
}
