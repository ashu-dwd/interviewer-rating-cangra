# Use an official Node.js runtime
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Expose application port (adjust if needed)
EXPOSE 3000

# Start command (adjust if needed)
CMD [ "npm", "start" ]

