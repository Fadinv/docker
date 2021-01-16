FROM node:14.15.1
ENV NODE_ENV=production

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --production

EXPOSE 8000

CMD [ "node", "dist/index.js" ]