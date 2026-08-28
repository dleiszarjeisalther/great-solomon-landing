FROM nginx:alpine

ENV PORT=8080
ENV NGINX_ENVSUBST_FILTER="PORT"

# Copy template and assets
COPY default.conf.template /etc/nginx/templates/default.conf.template

COPY index.html styles.css script.js subsystems.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
COPY uiv2-components/ /usr/share/nginx/html/uiv2-components/

EXPOSE 8080

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:${PORT}/healthz || exit 0

# Substitute only ${PORT} and start Nginx cleanly
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]