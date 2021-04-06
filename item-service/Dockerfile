FROM node:lts-alpine as builder
LABEL stage=builder
# ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn codegen && yarn build

FROM node:lts-alpine as runner
LABEL stage=runner
ENV NODE_ENV "production"

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --from=builder /app/build ./

ENTRYPOINT ["node", "."]
EXPOSE 4001
# EXPOSE 443
