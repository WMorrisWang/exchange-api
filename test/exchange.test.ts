import "reflect-metadata";
import {expect, test, describe} from "@jest/globals";
import container from "../src/ioc_container";
import {ExchangeRatio} from "../src/interfaces/exchangeInterface";
import TYPES from "../src/constant/identifiers";
import {Currency} from "../src/constant/constant";

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
