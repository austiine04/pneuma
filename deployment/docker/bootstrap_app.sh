#!/bin/bash

set -xe

#generate the secret key
SECRET_KEY_BASE=$(rake secret)
echo "SECRET_KEY_BASE=$SECRET_KEY_BASE" >> .env

#migrate the database
service postgresql start

cd /srv/pneuma
rake db:migrate
rake db:seed
rake assets:precompile

service postgresql stop
