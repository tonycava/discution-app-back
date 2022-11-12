FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json .

RUN yarn install --frozen-lockfile \
    && yarn cache clean --force \
    && yarn prisma generate

COPY . .

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]