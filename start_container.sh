#!/bin/bash

docker run --rm -d -p 8080:8080 -v /home/juan/git_repos/mediasmart_bidding_server/bidding_server/:/usr/src/app/ --name bidding_server node-web-app 
