# set base image
FROM node:14-alpine

# accept arguments
ARG port=8000

# use argument as environment variable
ENV PORT=$port

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

