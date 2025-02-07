#!/bin/bash

set -e

export $(cat /app/.env | xargs)

service mariadb restart

until mariadb -u root -p$MARIADB_ROOT_PASSWORD -e "SELECT 1;" &> /dev/null; do
    echo "Wainting for MariaDB start ..."
    sleep 1
done

mariadb -u root -p$MARIADB_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS \`$MARIADB_DATABASE\`;"
mariadb -u root -p$MARIADB_ROOT_PASSWORD -e "CREATE USER '$MARIADB_USER'@'localhost' IDENTIFIED BY '$MARIADB_PASSWORD';"
mariadb -u root -p$MARIADB_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON \`$MARIADB_DATABASE\`.* TO '$MARIADB_USER'@'localhost';"
mariadb -u root -p$MARIADB_ROOT_PASSWORD -e "FLUSH PRIVILEGES"

/app/venv/bin/python /app/create_tables_db.py

service nginx restart

pm2 start /app/index.js --name api > /dev/null 2>&1

# "hack" to avoid container down
tail -f /dev/null