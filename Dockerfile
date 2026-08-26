FROM nginx:alpine

# Copy the static files directly into the Nginx public directory
COPY index.html script.js styles.css /usr/share/nginx/html/

# Copy the uiv2-components folder contents
COPY uiv2-components /usr/share/nginx/html/uiv2-components/

# Copy the Nginx template that handles dynamic $PORT binding
COPY default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
