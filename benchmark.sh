#!/bin/sh

wrk -c 100 -d 30 -t 2 --latency -s call.lua http://127.0.0.1:8080
