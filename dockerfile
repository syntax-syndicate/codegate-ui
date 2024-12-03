FROM node:20.18.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json tailwind.config.ts postcss.config.js tsconfig*.json components*.json vite.config.ts index.html ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]