# 多階段建置：第一階段建置 React 應用程式
FROM node:18-alpine as build

# 設定工作目錄
WORKDIR /app

# 複製 package.json
COPY package.json ./

# 安裝依賴
RUN npm install

# 複製原始碼
COPY . .

# 建置 React 應用程式
RUN npm run build

# 第二階段：使用 nginx 提供靜態檔案
FROM nginx:alpine

# 複製建置好的檔案到 nginx 目錄
COPY --from=build /app/build /usr/share/nginx/html

# 建立自定義 nginx 配置以支援 React Router
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # React Router 支援 \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # 靜態資源快取 \
    location /static/ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    \
    # 安全標頭 \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
}' > /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]