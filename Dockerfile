FROM node:11-slim

LABEL maintainer="David Regla <dreglad@gmail.com>"

WORKDIR /usr/src/app

COPY src ./src
COPY package.json ./
COPY yarn.lock ./
RUN touch ./.env

EXPOSE 4000

CMD [ "yarn", "start" ]
