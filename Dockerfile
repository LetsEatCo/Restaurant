FROM mhart/alpine-node:10.11

RUN mkdir -p /letseat/restaurants

WORKDIR /letseat/restaurants

COPY package.json /letseat/restaurants

COPY . /letseat/restaurants

RUN yarn install

EXPOSE 5050

CMD yarn start:dev