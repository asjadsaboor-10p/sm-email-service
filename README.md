# sm-email-service
A simple email service

### TODO
1. implement logger
2. make ts lint a little more strict.

## Prerequisites

1. docker and docker compose (lastest version) [Docker](https://www.docker.com/) & [Docker-Compose](https://docs.docker.com/compose/)


## commands to get you started

1. git clone https://github.com/asjadsaboor/sm-email-service.git
2. create [.env](#sample-.env) file in config directory
3. `npm install` (install packages locally, since we don't mount node_modules in container)
4. `npm run build:docker`
5. `npm run start:docker`

## Some other usefull commands

A collection of useful commands which might be useful :)

### Logs

1. `npm run logs`: view logs

### Linting / Code prettify

1. `npm run lint`
2. `npm run lint:fix`
3. `npm run format:check`
4. `npm run format:fix:all`

### debug

1. uncomment following line from docker-compose.yml

```
#- --inspect-brk=0.0.0.0
```

2. create launch.json in .vscode folder, and copy following code

```
{
  "version": "0.2.0",
  "configurations": [{
    "type": "node",
    "request": "attach",
    "name": "Docker: Attach to Node",
    "port": 9229,
    "address": "localhost",
    "localRoot": "${workspaceFolder}/src",
    "remoteRoot": "/api/src",
    "protocol": "inspector"
  }]
}
```


### Sample .env

```
NODE_ENV=local
PORT=4001
```

