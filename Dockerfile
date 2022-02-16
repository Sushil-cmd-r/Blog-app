FROM node:14.18.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm","start" ]