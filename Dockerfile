FROM registry.corp.hetao101.com/ops/alpine:nginx1.13.3-alpine 

COPY dist/ /project/dist/
ADD  default.conf /etc/nginx/conf.d/default.conf

