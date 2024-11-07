FROM nginx:alpine

COPY ./dist /usr/share/nginx/html

RUN nginx -t
