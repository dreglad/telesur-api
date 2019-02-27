FROM node:11-slim

LABEL maintainer="David Regla <dreglad@gmail.com>"

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN touch ./.env
COPY src ./src

EXPOSE 5000

CMD [ "yarn", "start" ]
