FROM alpine:3.7 as build

RUN apk add --no-cache hugo

COPY ./ /opt/blog
WORKDIR /opt/blog

RUN hugo

FROM ghcr.io/meyskens/static-base:1840d431d467312df40e32db9ce17c11ca4d4464

COPY --from=build /opt/blog/public /var/www
