ARG NODE_VERSION=20.0.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
RUN npm install -g pnpm
EXPOSE 3000

FROM base as prod
COPY . .
RUN pnpm install
RUN pnpm build  
USER node
CMD ["pnpm", "start"]

FROM base as test
ENV NODE_ENV test
COPY . .
RUN pnpm install 
USER node
RUN pnpm test