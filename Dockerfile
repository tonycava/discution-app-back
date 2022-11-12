FROM node:18-alpine as builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate

EXPOSE 3000

CMD [ "yarn", "start:prod" ]