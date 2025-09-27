# ---- build stage ----
    FROM node:20-alpine AS build
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci --no-audit --no-fund
    
    COPY . .
    
    # Inject API URL at build time
    ARG VITE_API_BASE_URL
    ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
    RUN npm run build
    
    # ---- run stage ----
    FROM nginx:alpine
    
    # Copy build output
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copy custom nginx config (rewrite rule for React Router)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    