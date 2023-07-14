FROM node:18-slim as node-server
WORKDIR /backpacker
COPY package.json ./
COPY package-lock.json ./

RUN npm i
COPY ./ ./
EXPOSE 3000
CMD ["node", "server.js"]