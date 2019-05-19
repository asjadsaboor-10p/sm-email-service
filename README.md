# sm email service
A simple email service

# Documentation
### Prerequisites

1. docker and docker compose (lastest version) [Docker](https://www.docker.com/) & [Docker-Compose](https://docs.docker.com/compose/)
2. Mailgun and Sendgrid accounts

### commands to get you started

1. git clone https://github.com/asjadsaboor/sm-email-service.git and go to project folder.
2. create [.env](#sample-.env) file in config directory
3. `npm install` (install packages locally, since we don't mount node_modules in container)
4. `npm run build:docker`
5. `npm run start:docker`

A collection of useful commands which might be helpful

### Logs

1. `npm run logs`

### Linting / Code prettify

1. `npm run lint`
2. `npm run lint:fix`
3. `npm run format:check`
4. `npm run format:fix:all`

### Run tests

1. `npm run test`

### Create apidocs

1. `npm run apidocs`

### Debug

1. uncomment following line from docker-compose.yml

```
#- --inspect-brk=0.0.0.0
```

2. create launch.json in .vscode folder, and copy following code

```json
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
API_KEY_SENDGRID=XXX
API_KEY_MAILGUN=XXX
MAILGUN_DOMAIN=xxx
```

## API Details

### API Docs

[http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/docs/](http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/docs/)

### URL

[http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/v1/](http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/v1/)


### Methods
  POST     email/send

### Example Request to send  email

Body
```json
{
	"to":["asjadsaboor@gmail.com"],
	"cc":["asjadsaboor1@yopmail.com"],
	"bcc":["asjadsaboor2@yopmail.com"],
	"subject": "my subject",
	"body":"my email body"
}
```

CURL
```sh
curl -X POST \
  http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/v1/email/send \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"to":["asjadsaboor@gmail.com"],
	"cc":["asjadsaboor1@yopmail.com"],
	"bcc":["asjadsaboor2@yopmail.com"],
	"subject": "from em service1 aws",
	"body":"from em service1 aws"
}'
```

## Deployment

API is deployed on AWS Elastic Container service and attached to elastic load balancer.

Codepipeline is used for automated deployment.

## Problem Statement and Solution

* **Implement a email service using 2 service providers, such that if one goes down that service can quickly switch to the other**

When a user call REST API to send emails, first the request is send using the primary server.If the request of primary server fails, a key is set in in-memmory cache to deactivate primary  server for few minutes and secondary email service will be used till the primaryserver key expires.

What will happen if both providers are down? A rare possibility, but in this case all request can be send to a SQS and a lambda can be attached to SQS to retry these requests. 

Note: SQS is not yet implemented.

## TODO List
1. Implement logger and push logs to cloudwatch or similar service.
2. Make tslint a little more strict and run lint/test in CI/CD.
3. Implement API rate limiting
4. Add integration tests
5. Implement Queue based solution for eg( SQS and lambda ), so that we can push requests to queue in case all email providers are down.
6. attach SSL to  aws elastic load balancer and redirect http to https.
7. Replace in memory cache with centeralized cache like redis.
8. Enable auto scaling in ECS to handle heavy traffic.