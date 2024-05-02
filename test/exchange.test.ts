import "reflect-metadata";
import {expect, test, describe} from "@jest/globals";
import container from "../src/ioc_container";
import {Exchange, ExchangeRatio} from "../src/interfaces/exchangeInterface";
import TYPES from "../src/constant/identifiers";
import {AVAILABLE_CURRENCIES, Currency} from "../src/constant/constant";

describe("LocalExchangeRepository.getExchangeRatio()", () => {
    test("expect exchange ratio to be correct", () => {
        const LocalExchangeRepository = container.get<ExchangeRatio>(
            TYPES.ExchangeRatio
        );
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.TWD, Currency.TWD)
        ).toBe(1);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.TWD, Currency.JPY)
        ).toBe(3.669);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.TWD, Currency.USD)
        ).toBe(0.03281);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.JPY, Currency.TWD)
        ).toBe(0.26956);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.JPY, Currency.TWD)
        ).toBe(0.26956);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.JPY, Currency.TWD)
        ).toBe(0.26956);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.JPY, Currency.TWD)
        ).toBe(0.26956);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.JPY, Currency.TWD)
        ).toBe(0.26956);
        expect(
            LocalExchangeRepository.getExchangeRatio(Currency.JPY, Currency.TWD)
        ).toBe(0.26956);
    });
    test("expect error when receiving incorrect currency type", () => {
        const LocalExchangeRepository = container.get<ExchangeRatio>(
            TYPES.ExchangeRatio
        );
        expect(() =>
            LocalExchangeRepository.getExchangeRatio(
                "" as Currency,
                Currency.TWD
            )
        ).toThrow("currency not found");
    });
});
describe("ExchangeService.exchange()", () => {
    test("expect exchanged currency amount to be correct", () => {
        const LocalExchangeRepository = container.get<ExchangeRatio>(
            TYPES.ExchangeRatio
        );
        const exchangeService = container.get<Exchange>(TYPES.Exchange);
        const amount = 1234567;
        AVAILABLE_CURRENCIES.forEach(source => {
            AVAILABLE_CURRENCIES.forEach(target => {
                const expectedNumber =
                    Math.round(
                        LocalExchangeRepository.getExchangeRatio(
                            source as Currency,
                            target as Currency
                        ) *
                            amount *
                            100
                    ) / 100;
                const expectedResult = Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "usd",
                })
                    .format(expectedNumber)
                    .slice(1);
                expect(
                    exchangeService.exchange(
                        source as Currency,
                        target as Currency,
                        amount
                    )
                ).toBe(expectedResult);
            });
        });
    });
    test("expect exchanged currency amount to be correct", () => {
        const LocalExchangeRepository = container.get<ExchangeRatio>(
            TYPES.ExchangeRatio
        );
        const exchangeService = container.get<Exchange>(TYPES.Exchange);
        const amount = 1234567;
        AVAILABLE_CURRENCIES.forEach(source => {
            AVAILABLE_CURRENCIES.forEach(target => {
                const expectedNumber =
                    Math.round(
                        LocalExchangeRepository.getExchangeRatio(
                            source as Currency,
                            target as Currency
                        ) *
                            amount *
                            100
                    ) / 100;
                const expectedResult = Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "usd",
                })
                    .format(expectedNumber)
                    .slice(1);
                expect(
                    exchangeService.exchange(
                        source as Currency,
                        target as Currency,
                        amount
                    )
                ).toBe(expectedResult);
            });
        });
    });
});
