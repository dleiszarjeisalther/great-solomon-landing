FROM nginx:alpine

ENV PORT=8080

# Copy nginx template which supports dynamic $PORT via envsubst
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copy static assets to web root
COPY . /usr/share/nginx/html

EXPOSE 8080 80

CMD ["nginx", "-g", "daemon off;"]