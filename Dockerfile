# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install production dependencies
RUN npm ci --only=production

# Install pm2 globally
RUN npm install pm2 -g

# Copy source code
# Copy the rest of the application code
COPY . .

# Expose port (adjust if needed)
EXPOSE 3000

# Start the server using pm2-runtime
# pm2-runtime is recommended for Docker containers
CMD ["pm2-runtime", "app.js"]
