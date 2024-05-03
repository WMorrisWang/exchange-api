# Currency exhange api

This is a project using InversifyJS to ensure that the software architecture follows the SOLID principle, specifically focusing on achieving `inversion of control principle` by using dependency injection. The programme includes:

-   Two Interfaces `ExchangeRatio` and `Exchange`
-   One implementation of `ExchangeRatio`: `ExchangeRepository`
-   One implementation of `Exchange`: `ExchangeService`

## Api spec:

### GET /v1/exchange

| query parameter | data type                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| source          | string enum:TWD, JPY, USD                                                                                         |
| target          | string enum:TWD, JPY, USD                                                                                         |
| amount          | string currency format with 2 decimal point without dollar sign or negative prefix, decimal sepatator is optional |

## To build and host the api in the container

```linux
docker build ./ -t exchange-api --target prod && run -d exchange-api
docker run -d -p 3000:3000 exchange-api
```

you can send the request from http://localhost:300/v1/exchange/ after hosting

## To test the app in the container

```linux
docker build -t exchange-api-test --progress=plain --no-cache --target test .
```

## To clean up

```linux
docker rm $(docker stop $(docker ps -a -q --filter ancestor=exchange-api --format="{{.ID}}"))
docker image rm exchange-api
```
