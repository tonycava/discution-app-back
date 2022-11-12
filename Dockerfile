FROM node:18-alpine as builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
ADD package*.json .

# Install app dependencies
RUN yarn install --frozen-lockfile

RUN yarn prisma generate

COPY . .

RUN ls -la

FROM node:18-alpine

WORKDIR /app

# Copy node_modules from builder image
COPY --from=builder /app/. .

ADD . /app

RUN ls -la

EXPOSE 3000

CMD [ "yarn", "start:prod" ]