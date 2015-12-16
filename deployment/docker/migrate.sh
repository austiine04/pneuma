#!/bin/bash

set -xe

# migrate db
service postgresql start
rake db:migrate
rake db:seed
service postgresql stop

SECRET_KEY_BASE=$(rake secret)
echo "SECRET_KEY_BASE=$SECRET_KEY_BASE" >> .env
