FROM node:lts AS build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
CMD [ "yarn", "start" ]


