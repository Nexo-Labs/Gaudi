FROM node:latest AS Dependencies

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn


FROM node:latest AS Build
WORKDIR /app

COPY --from=Dependencies /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:alpine AS Deploy
WORKDIR /app

ENV NODE_ENV production
COPY --from=build /app/package.json package.json
COPY --from=build /app/.svelte-kit .svelte-kit
COPY --from=build /app/build build
COPY --from=build /app/node_modules/ node_modules/
COPY --from=build /app/static static
COPY --from=build /app/scripts/entrypoint.sh scripts/entrypoint.sh
RUN chmod +x /app/scripts/entrypoint.sh


ENTRYPOINT [ "/app/scripts/entrypoint.sh" ]
CMD ["node", "build"]
