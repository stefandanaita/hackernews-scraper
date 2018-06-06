# LTS Node version
FROM node:carbon

# Some metadata
LABEL version="1.0"
LABEL description="Hacker News Scraper"
LABEL maintainer "Stefan Danaita <me@dsa.io>"

RUN mkdir -p ~/scraper
WORKDIR ~/scraper

# Prepare the node_modules
COPY package*.json ./
RUN npm install --only-production

# Copy the sourcecode
COPY ./ ./

# Set the right Node path for nice lib import paths
ENV NODE_PATH build

ENTRYPOINT ["node", "build"]