#!/bin/bash
echo @@@@@@@before-deploy.sh@@@@@@@@@
REPOSITORY=/home/ubuntu/build
sudo pm2 kill
sudo pm2 delete app

cd $REPOSITORY