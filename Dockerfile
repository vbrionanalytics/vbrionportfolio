# ============================================
# Multi-stage Dockerfile for vbrion Portfolio
# ============================================

# Step 1: Build client frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Step 2: Install server production dependencies
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./

# Step 3: Final production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Copy server and built client
COPY --from=server-builder /app/server ./server
COPY --from=client-builder /app/client/dist ./client/dist

# Expose server port
EXPOSE 5000

# Start server
CMD ["node", "server/src/server.js"]
