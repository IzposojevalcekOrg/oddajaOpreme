FROM node:8-alpine
RUN mkdir /leasing
WORKDIR /leasing
COPY . /leasing
CMD npm run prod
EXPOSE 8080