#!/usr/bin/env bash

echo "
{
  \"SomeEnvVar\" : \"${WEB_API_URL}\"
}
" > /usr/share/nginx/html/config.json

if [[ "${NODE_ENV}" == 'development' ]]; then
  echo "copying $NODE_ENV nginx.conf"
  cp /root/default.dev.conf /etc/nginx/conf.d/default.conf
fi

ls -alt /etc/nginx/conf.d/

cat /etc/nginx/conf.d/default.conf

service ssh start

nginx -g 'daemon off;'
