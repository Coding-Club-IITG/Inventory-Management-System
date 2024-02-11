FROM node:21-alpine

RUN mkdir /rim_frontend

WORKDIR /rim_frontend

COPY . .

EXPOSE 8000

RUN npm i

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "8000"]