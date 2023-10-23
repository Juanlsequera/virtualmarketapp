FROM node:18 AS reactjs
WORKDIR /app/reactjs
COPY virtual-store-client/package*.json ./
RUN npm install
COPY virtual-store-client/ .
RUN npm run build

FROM node:18 AS nestjs
WORKDIR /app/nestjs
COPY virtual-store-api/package*.json ./
RUN npm install
COPY virtual-store-api/ .

FROM node:18
WORKDIR /app
COPY --from=reactjs /app/reactjs/build ./reactjs
COPY --from=nestjs /app/nestjs ./
EXPOSE 3000
CMD ["npm", "start"]