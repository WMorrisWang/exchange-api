# Exhange api

## To run this in container

```linux
docker build ./ -t exchange-api && run -d exchange-api
docker run -d -p 3000:3000 exchange-api
```

## To clean up

```linux
docker rm $(docker stop $(docker ps -a -q --filter ancestor=exchange-api --format="{{.ID}}"))
docker image rm exchange-api
```
