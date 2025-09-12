# --- ESTÁGIO 1: Build com Node.js ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN npx ng build

# --- ESTÁGIO 2: Servidor com Nginx ---
FROM nginx:stable-alpine

# AQUI ESTÁ A CORREÇÃO: o caminho agora aponta para a pasta correta
COPY --from=builder /app/dist/consorcio-front /usr/share/nginx/html

# Copia nossa configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80
