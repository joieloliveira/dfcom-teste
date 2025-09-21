FROM node:18

# Instala PM2 globalmente
RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Roda com PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
