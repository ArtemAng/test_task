FROM node:18.15.0-alpine as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

FROM development as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN npm run build

FROM node:18.15.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm pkg delete scripts.prepare
RUN npm prune

COPY . .

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
