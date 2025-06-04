FROM node:22.16.0-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest pnpm@latest typescript@latest
RUN pnpm install

COPY . .

RUN pnpm run build

CMD [ "pnpm", "start" ]