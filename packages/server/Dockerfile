FROM mhart/alpine-node:12

ENV PORT=5000

RUN npm i -g lerna

WORKDIR /home/node/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY packages/server/package.json ./packages/server/package.json

RUN yarn install --pure-lock-file

COPY packages/server ./packages/server

CMD ["yarn", "start:server"]