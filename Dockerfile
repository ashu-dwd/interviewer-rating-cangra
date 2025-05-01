# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Install PM2 globally
RUN npm install -g pm2

# Copy rest of the source code
COPY . .

# Expose the port
EXPOSE 3000

# Start app with PM2 in single-process mode
CMD ["pm2-runtime", "app.js"]
