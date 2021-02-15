FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Install redis server
RUN apt update 
RUN apt install -y redis-server

# Install redis client
RUN npm install redis

# Bundle app source
COPY . .

EXPOSE 8080
ADD start.sh /
CMD [ "/start.sh" ]

