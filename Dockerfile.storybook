FROM node:latest AS build

# A small line inside the image to show who made it
LABEL Developers="Rubén García Hernando"
COPY start.sh ./start.sh
RUN chmod +x start.sh

USER node:node
EXPOSE 5173 6006

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy all local files into the image
COPY src ./src
COPY .storybook ./.storybook
COPY static ./static
COPY package.json .
COPY postcss.config.js .
COPY svelte.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY vite.config.ts .
COPY yarn.lock .

# Clean install all node modules
RUN yarn install
RUN yarn build-storybook

CMD ["npx", "http-server", "./storybook-static"]
