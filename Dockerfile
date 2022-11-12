FROM node:18-alpine as builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
ONBUILD ADD package*.json /app/

# Install app dependencies
ONBUILD RUN yarn install --frozen-lockfile \
    && yarn cache clean --force \
    && yarn prisma generate

COPY . .

FROM node:18-alpine

WORKDIR /app

# Copy node_modules from builder image
COPY --from=builder /app/. .
COPY /app/.env .

ADD . /app

EXPOSE 3000

CMD [ "yarn", "start:prod" ]