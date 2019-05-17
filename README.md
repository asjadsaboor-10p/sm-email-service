# sm email service
A simple email service

# Documentation
### Prerequisites

1. docker and docker compose (lastest version) [Docker](https://www.docker.com/) & [Docker-Compose](https://docs.docker.com/compose/)

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

### debug

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
```
http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/docs/
```
###URL
```
http://sm-email-service-2058030217.us-east-1.elb.amazonaws.com/api/v1/
```

###methods
  POST  email/send
  GET   ping

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


## TODO List
1. Implement logger and push logs to cloudwatch
2. Make tslint a little more strict.
3. Implement API rate limiting
4. Improve unit test code coverage
5. Implement QueueMove in-memory cache to centerlized cachine like redis.
6. Move in-memory cache to centerlized cachine like redis.
6.  based solution using SQS and lambda , so that  we can push email requests to queue in case all email providers are down.
6. attach SSL to  aws elastic load balancer and redirect http to https.
7. 