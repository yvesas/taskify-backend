FROM node:22-alpine
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install
COPY . .
RUN npx prisma generate
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "start:prod"]
