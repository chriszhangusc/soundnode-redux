FROM node:lts AS build
COPY . /home/app/
WORKDIR /home/app
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:latest
COPY --from=build /home/app/dist /usr/share/nginx/html
