FROM iojs:latest

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

COPY . /src

WORKDIR /src

RUN npm install \
  npm install bower -g \
  bower install \
  gulp


EXPOSE 4000

CMD ["node", "index.js"]