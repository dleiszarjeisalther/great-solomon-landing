FROM nginx:alpine

# Remove default templates and configs to avoid entrypoint script conflicts
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/templates

# Copy static custom nginx config listening on 8080 and 80
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy web assets
COPY index.html styles.css script.js subsystems.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
COPY uiv2-components/ /usr/share/nginx/html/uiv2-components/

# Ensure web permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 8080 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || wget --quiet --tries=1 --spider http://127.0.0.1:80/healthz || exit 0

CMD ["nginx", "-g", "daemon off;"]