# FROM node:20-alpine

# WORKDIR /app

# COPY pnpm-lock.yaml package.json ./

# RUN npm install -g pnpm

# RUN pnpm i 

# COPY . .

# RUN pnpm run build

# EXPOSE 3000

# CMD ["pnpm", "start"]

ARG NODE_VERSION=20.0.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
RUN npm install -g pnpm
EXPOSE 3000

FROM base as prod
COPY . .
RUN pnpm install --prod
RUN pnpm build  
USER node
CMD ["pnpm", "start"]

FROM base as test
ENV NODE_ENV test
COPY . .
RUN pnpm install 
USER node
RUN pnpm test