#!/bin/bash

redis-server &

node server.js &

# Load test data
while ! pidof redis-server >> /dev/null ;
do
sleep 1
done
cat /usr/src/app/script.redis | redis-cli --pipe
