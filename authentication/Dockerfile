FROM node:20-bullseye-slim as base

WORKDIR /home/node/app
COPY package*.json ./
COPY .env ./
COPY . .

RUN npm install
RUN npx prisma generate

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
