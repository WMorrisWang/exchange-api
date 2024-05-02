import type {Currency} from "../constant/constant";
import {injectable} from "inversify";
import {ExchangeRatio} from "../interfaces/exchangeInterface";

@injectable()
export class LocalExchangeRepository implements ExchangeRatio {
    private exchangeData = {
        TWD: {
            TWD: 1,
            JPY: 3.669,
            USD: 0.03281,
        },
        JPY: {
            TWD: 0.26956,
            JPY: 1,
            USD: 0.00885,
        },
        USD: {
            TWD: 30.444,
            JPY: 111.801,
            USD: 1,
        },
    };
    public getExchangeRatio(source: Currency, target: Currency): number {
        if (!this.exchangeData?.[source]?.[target]) {
            throw new Error("currency not found");
        }
        return this.exchangeData[source][target];
    }
}
