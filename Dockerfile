FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]