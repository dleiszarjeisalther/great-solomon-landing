FROM nginx:alpine

ENV PORT=8080

# Clean default configs
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/templates /docker-entrypoint.d/*

# Prepare world-writable temp directories so non-root containers never fail with permission denied
RUN mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp /var/cache/nginx \
    && chmod -R 777 /tmp /var/cache/nginx /var/log/nginx

# Copy rootless-friendly nginx configs
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy web files
COPY . /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 8080 80

CMD ["nginx", "-g", "daemon off;"]