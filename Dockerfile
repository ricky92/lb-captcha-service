FROM node:16-alpine

RUN apk add --no-cache --virtual build-deps build-base g++ cairo-dev pixman-dev jpeg-dev pango-dev giflib-dev

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node package*.json ./
RUN npm install

COPY --chown=node . .

RUN npm run build

USER root
RUN apk del build-deps && \
  apk add --no-cache cairo jpeg pango giflib pixman pangomm libjpeg-turbo freetype ttf-dejavu

ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]
