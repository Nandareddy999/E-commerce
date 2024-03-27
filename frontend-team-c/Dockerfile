# Use the official Node.js image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /src/app/fullstack/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# RUN npm cache clean --force

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm,", "start"]