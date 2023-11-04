FROM node:20-bullseye-slim as base

WORKDIR /home/node/app
COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
