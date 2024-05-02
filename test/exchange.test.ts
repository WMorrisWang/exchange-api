import "reflect-metadata";
import {expect, test, describe} from "@jest/globals";
import container from "../src/ioc_container";
import {Exchange, ExchangeRatio} from "../src/interfaces/exchangeInterface";
import TYPES from "../src/constant/identifiers";
import {AVAILABLE_CURRENCIES, Currency} from "../src/constant/constant";
import {app} from "../src/server";
import request from "supertest";
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
describe("GET /v1/exchange happy path", () => {
    const BASE_URL = "/v1/exchange";
    test("expect exchange amount to be correct without decimal separator", done => {
        const parameters = new URLSearchParams([
            ["source", "USD"],
            ["target", "JPY"],
            ["amount", "1525"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(200)
            .then(function (res) {
                expect(res.body).toEqual({
                    msg: "success",
                    amount: "170,496.53",
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect exchange amount to be correct with decimal separator", done => {
        const parameters = new URLSearchParams([
            ["source", "USD"],
            ["target", "JPY"],
            ["amount", "1,525"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(200)
            .then(function (res) {
                expect(res.body).toEqual({
                    msg: "success",
                    amount: "170,496.53",
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect exchange amount to be correct with 2 decimal point", done => {
        const parameters = new URLSearchParams([
            ["source", "USD"],
            ["target", "JPY"],
            ["amount", "1525.00"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(200)
            .then(function (res) {
                expect(res.body).toEqual({
                    msg: "success",
                    amount: "170,496.53",
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect exchange amount to be correct with 2 decimal point and decimal separator", done => {
        const parameters = new URLSearchParams([
            ["source", "USD"],
            ["target", "JPY"],
            ["amount", "1,525.00"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(200)
            .then(function (res) {
                expect(res.body).toEqual({
                    msg: "success",
                    amount: "170,496.53",
                });
                done();
            })
            .catch(error => done(error));
    });
});
describe("GET /v1/exchange exceptions", () => {
    const BASE_URL = "/v1/exchange";
    test("expect error sending empty request", done => {
        request(app)
            .get(BASE_URL)
            .expect(400)
            .then(function (res) {
                expect(res.body).toEqual({
                    error: [
                        {
                            type: "field",
                            msg: "source required",
                            path: "source",
                            location: "query",
                        },
                        {
                            type: "field",
                            msg: "target required",
                            path: "target",
                            location: "query",
                        },
                        {
                            type: "field",
                            msg: "amount required",
                            path: "amount",
                            location: "query",
                        },
                    ],
                });
                return done();
            })
            .catch(error => done(error));
    });
    test("expect error sending invalid currency type", done => {
        const parameters = new URLSearchParams([
            ["source", "RMB"],
            ["target", "RMB"],
            ["amount", "100"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(400)
            .then(function (res) {
                expect(res.body).toEqual({
                    error: [
                        {
                            type: "field",
                            value: "RMB",
                            msg: "Invalid currency input",
                            path: "source",
                            location: "query",
                        },
                        {
                            type: "field",
                            value: "RMB",
                            msg: "Invalid currency input",
                            path: "target",
                            location: "query",
                        },
                    ],
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect error sending negative amount", done => {
        const parameters = new URLSearchParams([
            ["source", "TWD"],
            ["target", "TWD"],
            ["amount", "-1525"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(400)
            .then(function (res) {
                expect(res.body).toEqual({
                    error: [
                        {
                            type: "field",
                            value: "-1525",
                            msg: "invalid amount input",
                            path: "amount",
                            location: "query",
                        },
                    ],
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect error sending 3 decimal point", done => {
        const parameters = new URLSearchParams([
            ["source", "TWD"],
            ["target", "TWD"],
            ["amount", "1525.123"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(400)
            .then(function (res) {
                expect(res.body).toEqual({
                    error: [
                        {
                            type: "field",
                            value: "1525.123",
                            msg: "invalid amount input",
                            path: "amount",
                            location: "query",
                        },
                    ],
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect error sending 1 decimal point", done => {
        const parameters = new URLSearchParams([
            ["source", "TWD"],
            ["target", "TWD"],
            ["amount", "1525.1"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(400)
            .then(function (res) {
                expect(res.body).toEqual({
                    error: [
                        {
                            type: "field",
                            value: "1525.1",
                            msg: "invalid amount input",
                            path: "amount",
                            location: "query",
                        },
                    ],
                });
                done();
            })
            .catch(error => done(error));
    });
    test("expect error sending amount with wrong decimal separtor ", done => {
        const parameters = new URLSearchParams([
            ["source", "TWD"],
            ["target", "TWD"],
            ["amount", "15,25.123"],
        ]);
        request(app)
            .get(`${BASE_URL}?${parameters.toString()}`)
            .expect(400)
            .then(function (res) {
                expect(res.body).toEqual({
                    error: [
                        {
                            type: "field",
                            value: "15,25.123",
                            msg: "invalid amount input",
                            path: "amount",
                            location: "query",
                        },
                    ],
                });
                done();
            })
            .catch(error => done(error));
    });
});
