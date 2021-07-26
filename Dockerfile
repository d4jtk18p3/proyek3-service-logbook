FROM node:16-alpine3.13

COPY . /src/app

WORKDIR /src/app
RUN npm ci --only=production

WORKDIR /src/app/postgres-database
RUN npm install --only=production

WORKDIR /src/app/logbook
RUN npm install --only=production

CMD ["node", "--experimental-specifier-resolution=node", "src/main.js"]