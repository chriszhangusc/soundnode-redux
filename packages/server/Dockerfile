FROM mhart/alpine-node:12 as base

RUN npm i -g lerna

FROM base

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY packages/server/package.json ./packages/server/package.json

RUN yarn install --pure-lock-file

COPY packages/server ./packages/server

CMD ["yarn", "start:server"]