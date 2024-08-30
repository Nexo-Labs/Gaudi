FROM node:latest

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./

RUN yarn build

CMD ["sh", "-c", "node --env-file=/app/.env build"]
