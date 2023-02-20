# API-University


# Project Setup With Docker-Compose
```
docker-compose up
```



# Project Setup With Yarn

## Create .env file like .env.sample with the vars filled (example):
```
MONGOURI=mongodb://admin:password@mongo:27017
SECRETKEY=nOH1Tj7uvmKwlAZm13
```

## Instalation
```
yarn install
```


## Run development mode
```
yarn dev
```


## Run production mode
```
yarn start
```


## Generate swagger documentation
```
yarn doc
```


## Run cronjob
```
yarn cron
```



## Run test
```
yarn test
```