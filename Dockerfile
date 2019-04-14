FROM node:11

LABEL maintainer="David Regla <dreglad@gmail.com>"

ENV PORT=5000

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY src ./src

EXPOSE ${PORT}

CMD yarn start