#!/bin/bash

redis-server --daemonize yes

# Load test data
cat /usr/src/app/script.redis | redis-cli --pipe

#node server.js

tail -f /dev/null
