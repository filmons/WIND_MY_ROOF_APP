FROM node:latest
WORKDIR /app
RUN  npm
COPY . .
EXPOSE 8000
CMD ["node", "app.js"]