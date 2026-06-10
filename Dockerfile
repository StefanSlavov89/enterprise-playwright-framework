# Using the oficial Playwright image for Linux
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Set up working dir
WORKDIR /app

# Copy configuration files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project code
COPY . .

# Command for running the tests
CMD ["npx", "playwright", "test"]