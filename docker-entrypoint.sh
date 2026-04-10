#!/bin/sh
set -e

if [ -n "$BASIC_AUTH_USER" ] && [ -n "$BASIC_AUTH_PASSWORD" ]; then
    htpasswd -bc /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASSWORD"
    sed -i 's/__AUTH_BASIC_REALM__/Restricted/' /etc/nginx/conf.d/default.conf
else
    # 認証情報が未設定の場合は認証を無効化する
    touch /etc/nginx/.htpasswd
    sed -i 's/__AUTH_BASIC_REALM__/off/' /etc/nginx/conf.d/default.conf
fi

exec nginx -g "daemon off;"
