ARG ARCH
FROM maartje/static-base:${ARCH}-latest

COPY ./public /var/www