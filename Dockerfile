# Use an official Node runtime as a base image
FROM node:18.19.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Install CLI for nest
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]