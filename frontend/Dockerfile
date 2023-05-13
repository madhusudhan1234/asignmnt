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

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]