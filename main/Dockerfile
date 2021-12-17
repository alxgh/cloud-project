FROM node:16

WORKDIR /usr/src/auth
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]