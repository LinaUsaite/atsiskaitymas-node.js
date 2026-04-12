# Use the official Node.js 20 image based on Alpine Linux
# - "20" = Node.js version
# - "alpine" = very small Linux distro → smaller image, faster builds
FROM node:20-alpine

# Set the working directory INSIDE the container
# All following commands will run relative to /app
WORKDIR /app

# Copy only package.json and package-lock.json first
# This allows Docker to cache npm install layer
# If source code changes but dependencies don't, Docker won't reinstall packages
COPY package*.json ./

# Install Node.js dependencies inside the container
# node_modules will be created INSIDE the image
RUN npm install

# Copy the rest of the application source code into the container
# This includes server.js, src/, config files, etc.
COPY . .

# Inform Docker that the container listens on port 3001
# (Does NOT publish the port — docker-compose or docker run does that)
EXPOSE 3001

# Command that runs when the container starts
# This executes: npm run start
# Which usually maps to: node server.js
CMD ["npm", "run", "start"]
