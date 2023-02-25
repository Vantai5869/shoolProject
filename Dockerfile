# Choose a base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app listens on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
