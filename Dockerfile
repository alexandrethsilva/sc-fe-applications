FROM node:8-alpine

WORKDIR /

RUN yarn global add pm2

COPY yarn.lock /yarn.lock
COPY .babelrc /.babelrc
COPY package.json /package.json
COPY server.js /server.js

COPY ./application /application
COPY ./webpack /webpack

RUN yarn install --flat
# RUN npm install