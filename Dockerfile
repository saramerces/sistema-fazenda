FROM node:16

WORKDIR /app/src
COPY . .

RUN apt-get update && apt-get install -y npm

RUN npm install

CMD ["node", "server/app.js"]

