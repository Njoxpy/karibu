FROM node:lts-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENV VITE_API_URL=http://localhost:4100//api/v1

CMD ["npm", "run", "dev", "--", "--host"]
