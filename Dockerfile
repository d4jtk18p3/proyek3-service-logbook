FROM node:16-alpine3.13

COPY . /src/app
WORKDIR /src/app

RUN npm install --only=production

CMD ["node", "--experimental-specifier-resolution=node", "src/main.js"]