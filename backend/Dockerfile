FROM node:21-alpine

RUN mkdir /rim_backend

WORKDIR /rim_backend

COPY . .

RUN npm i

RUN apk update && apk add bash

EXPOSE 4000

EXPOSE 8080

CMD ["/bin/bash", "start.sh"]