#!/bin/sh
set -e

if [ -n "$BASIC_AUTH_USER" ] && [ -n "$BASIC_AUTH_PASSWORD" ]; then
    htpasswd -bc /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASSWORD"
else
    # 認証情報が未設定の場合は空ファイルを置いてnginxが起動できるようにする
    touch /etc/nginx/.htpasswd
fi

exec nginx -g "daemon off;"
