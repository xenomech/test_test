# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/ ./apps/web/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the web application
RUN cd apps/web && pnpm build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
