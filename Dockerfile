FROM node:20-alpine

WORKDIR /app/zipcode-app

COPY zipcode-app/package*.json ./
COPY zipcode-app/tsconfig.json ./

RUN npm install

COPY zipcode-app/ .

EXPOSE 3000

CMD ["npm", "run", "dev"] 
