FROM node:22.20.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port Vite runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
