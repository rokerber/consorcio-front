FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Atualizar as dependências do npm
RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN npm run build --prod

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

# Instalar o Angular CLI globalmente
RUN npm install -g @angular/cli

WORKDIR /app/dist/consorcio

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]