#!/bin/bash
echo @@@@@@@after-deploy.sh@@@@@@@@@
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

sudo npm ci
echo @@@@@@@@npm ci@@@@@@@@@@@

sudo pm2 start app.js
echo @@@@@@@@pm2 start app.js@@@@@@@@@@@
