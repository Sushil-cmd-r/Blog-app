FROM node:lts-alpine

WORKDIR /app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm","start" ]