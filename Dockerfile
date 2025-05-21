FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

RUN yarn run build

COPY . .

EXPOSE 80

CMD ["yarn", "run", "dev"]