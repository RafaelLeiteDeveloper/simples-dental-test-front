FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

FROM node:20-slim

WORKDIR /app

COPY ./setup-proxy.js /app/setup-proxy.js

COPY --from=build /app /app

RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["npm", "start"]
