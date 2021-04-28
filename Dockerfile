FROM amd64/alpine:3.7 as build

RUN apk add --no-cache hugo

COPY ./ /opt/blog
WORKDIR /opt/blog

RUN hugo

FROM ghcr.io/meyskens/static-base:f43eda38b2756e94e3cfaea868d68cfe2b142f55

COPY --from=build /opt/blog/public /var/www