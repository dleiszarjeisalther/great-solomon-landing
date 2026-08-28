FROM nginx:alpine

ENV PORT=80

# Copy dynamic nginx template (supports dynamic $PORT via envsubst)
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copy web assets to Nginx web root
COPY index.html styles.css script.js subsystems.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
COPY uiv2-components/ /usr/share/nginx/html/uiv2-components/

EXPOSE 80

# Health check endpoint for container orchestrators
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:${PORT}/healthz || exit 0

CMD ["nginx", "-g", "daemon off;"]