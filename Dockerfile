FROM node:16-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/analise-de-investimentos /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

