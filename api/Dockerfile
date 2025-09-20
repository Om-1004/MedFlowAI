# Use modern Node
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install only what's needed
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy source
COPY . .

# Best practice: production env
ENV NODE_ENV=production

# Your app must listen on 0.0.0.0:3000
EXPOSE 3000

# Start (uses "start" script from package.json)
CMD ["npm", "start"]
