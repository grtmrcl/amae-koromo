FROM node:18-slim AS builder

WORKDIR /app

RUN npm config set registry https://npm.flatt.tech

COPY package*.json ./

RUN npm ci --legacy-peer-deps --ignore-scripts

COPY . .

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache apache2-utils

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
