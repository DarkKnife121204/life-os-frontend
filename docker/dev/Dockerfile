FROM node:24-alpine3.22 AS node

WORKDIR /app

RUN npm config set update-notifier false

COPY package*.json ./

RUN npm ci

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]