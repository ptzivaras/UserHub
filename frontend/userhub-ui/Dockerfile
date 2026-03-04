# Build stage
FROM node:21-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/dist dist
COPY package*.json .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--port", "5173", "--host"]
