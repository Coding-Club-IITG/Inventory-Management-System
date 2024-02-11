FROM node:21-alpine

RUN mkdir /rim-portal

WORKDIR /rim-portal

COPY . .

EXPOSE 8000

EXPOSE 8080

EXPOSE 4000

RUN apk add bash

RUN cd frontend && npm install && npm run build

RUN /bin/bash install.sh

CMD ["/bin/bash", "start.sh"]