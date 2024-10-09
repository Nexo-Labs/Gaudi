FROM node:latest AS Dependencies

WORKDIR /app

COPY apps/web/package.json apps/web/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:latest AS Build
WORKDIR /app

COPY apps/web .
COPY --from=Dependencies /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm install -g pnpm && pnpm build

FROM node:alpine AS Deploy
WORKDIR /app

ENV NODE_ENV production
COPY --from=build /app/package.json package.json
COPY --from=build /app/.svelte-kit .svelte-kit
COPY --from=build /app/build build
COPY --from=build /app/prisma prisma
COPY --from=build /app/node_modules/ node_modules/
COPY --from=build /app/static static
COPY scripts/docker_entrypoint.sh scripts/docker_entrypoint.sh
RUN chmod +x /app/scripts/docker_entrypoint.sh


ENTRYPOINT [ "/app/scripts/docker_entrypoint.sh" ]
CMD ["sh", "-c", "node --env-file=/app/.env build"]
