FROM node:20.10.0-alpine

# Create a non-root user
RUN addgroup -g 1001 appuser && \
  adduser -u 1001 -G appuser -s /bin/sh -D appuser

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Change ownership of the directory to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Install dependencies
RUN npm install --quiet

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]
