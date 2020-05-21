FROM node:12

LABEL maintainer="David Regla <dreglad@gmail.com>"

ENV PORT=5000

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY src ./src
COPY database ./database

EXPOSE ${PORT}

CMD yarn start
