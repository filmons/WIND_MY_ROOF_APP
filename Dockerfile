FROM node:latest

WORKDIR /app

COPY packege*.json ./

RUN  npm 

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]