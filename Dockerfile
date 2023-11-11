FROM node:16-alpine AS builder
WORKDIR /app

# Dependencies
COPY .npmrc ./
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

# Build
ARG profile=local
RUN npm run build-${profile}

# Run
FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html
COPY --from=builder /app/.docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80