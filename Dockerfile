FROM node:lts-alpine

WORKDIR /app

COPY *.json ./

RUN npm install

COPY src src

# Gardons la migration
COPY db.sqlite ./db.sqlite

EXPOSE 4000

CMD ["npm", "run", "toto"]