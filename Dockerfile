FROM node:20.10.0-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]