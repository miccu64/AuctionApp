FROM node:latest

COPY ./ /frontend
RUN cd /frontend && npm ci && npm install -g serve
