# set base image
FROM node:14-alpine

# accept arguments
ARG node_env=production
ARG port=8000
ARG mongo_uri=mongodb://mongo:27017
ARG mongo_database=database
ARG jwt_secret=secret
ARG crypt_round=10

# use argument as environment variable
ENV NODE_ENV=$node_env
ENV PORT=$port
ENV MONGO_URI=$mongo_uri
ENV MONGO_DATABASE=$mongo_database
ENV JWT_SECRET=$jwt_secret
ENV CRYPT_ROUND=$crypt_round

# change working directory
WORKDIR /usr/src/app

# copy modules list
COPY package*.json ./

# install modules
RUN npm install --production

# copy all file
COPY . .

# expose port
EXPOSE ${PORT}

# run server
CMD ["npm", "start"]

