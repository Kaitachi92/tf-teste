# Dockerfile para o backend Node.js
FROM node:20-alpine
WORKDIR /app
COPY ./APP ./APP
WORKDIR /app/APP
RUN npm install || true
EXPOSE 3000
CMD ["node", "app.js"]
