FROM node:22-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# Custom nginx config: drops scanner probes, 410s the old /categories/ route,
# stops logging static assets, adds security headers.
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
