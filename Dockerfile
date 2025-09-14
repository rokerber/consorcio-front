# --- ESTÁGIO 1: Build com Node.js (Idêntico) ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN npx ng build

# --- ESTÁGIO 2: Servidor de Produção Limpo ---
# Começamos com uma imagem Alpine Linux limpa, a menor possível.
FROM alpine:latest

# Instalamos o Nginx e removemos o cache para manter a imagem pequena
RUN apk add --no-cache nginx

# Copia os arquivos da nossa aplicação Angular para a pasta padrão do Nginx no Alpine
COPY --from=builder /app/dist/consorcio-front /var/www/localhost/htdocs

# Copia nossa configuração customizada do Nginx, sobrescrevendo a padrão.
COPY nginx.conf /etc/nginx/http.d/default.conf

# Comando para iniciar o Nginx em modo "foreground" (não como daemon)
CMD ["nginx", "-g", "daemon off;"]
