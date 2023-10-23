FROM node:18 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-cache
COPY . .
RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "start"]

