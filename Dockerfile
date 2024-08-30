FROM node:latest

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./

RUN yarn build

ENTRYPOINT [ "/app/scripts/entrypoint.sh" ]
CMD ["sh", "-c", "node --env-file=/app/.env build"]
