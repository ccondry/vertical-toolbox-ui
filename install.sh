#!/bin/sh
echo "running npm install"
npm i
if [ $? -eq 0 ]; then
  echo "running npm run build..."
  npm run build
  if [ $? -eq 0 ]; then
    echo "npm build successful"
    #echo "removing old web files"
    #rm -rf /var/www/html/
    echo "making web files directory"
    mkdir -p /var/www/toolbox/branding
    echo "copying new web files"
    cp -rf dist/* /var/www/toolbox/branding/
  else
    echo "npm failed to run build script"
  fi
else
  echo "failed npm install"
fi
