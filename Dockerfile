# 使用 nginx 作為基礎映像
FROM nginx:alpine

# 複製網站檔案到 nginx 預設目錄
COPY index.html /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# 建立自定義 nginx 配置
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # 設定快取標頭 \
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # 安全標頭 \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
}' > /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]