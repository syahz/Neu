# Use Node.js as the base image
FROM node:22.8-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the Next.js app runs on (e.g., 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
