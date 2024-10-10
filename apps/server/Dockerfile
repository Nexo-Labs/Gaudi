FROM node:20-alpine as base
RUN npm i -g pnpm turbo
WORKDIR /app

FROM base AS builder

COPY . .
RUN pnpm install
RUN turbo prune --scope=server --docker
RUN pnpm build:server

FROM base AS runner
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

COPY --from=builder /app/apps/server/package.json .
RUN pnpm install --prod
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/build ./build
COPY --from=builder /app/apps/server/src ./src

COPY apps/server/scripts/docker_entrypoint.sh /docker_entrypoint.sh
RUN chmod +x /docker_entrypoint.sh

ENTRYPOINT [ "/docker_entrypoint.sh" ]
CMD ["sh", "-c", "node dist/server.js"]
