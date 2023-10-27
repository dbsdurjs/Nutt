FROM node:20.2.0-bullseye

COPY ./build /build

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "/build"]