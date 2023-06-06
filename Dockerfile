FROM node:19-alpine

# Set the working directory to /app
WORKDIR /app

# Install the dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Set the environment variable to serve the application on port 3001
ENV PORT 3001

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["yarn", "start"]