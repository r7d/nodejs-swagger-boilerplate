# Define app directory
ARG APP_DIR=/usr/src/app

#######################################################
# Builder image
#
FROM node:12.7.0-alpine AS build

# Create app directory
RUN MKDIR -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install && \
    yarn run build

#######################################################
# Run image
#
FROM node:12.7.0-alpine

# Define default env
ENV NODE_ENV production

# Create app directory
RUN MKDIR -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install && \
    yarn cache clean

# Copy builded source
COPY --from=build ${APP_DIR}/dist ./dist

# Set port
EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]