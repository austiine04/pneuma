#!/bin/bash

set -xe

#generate the secret key
SECRET_KEY_BASE=$(rake secret)
touch .env
echo "SECRET_KEY_BASE=$SECRET_KEY_BASE" >> .env

#migrate the database
service postgresql start
cd /srv/pneuma
RAILS_ENV=production rake db:migrate
RAILS_ENV=production rake db:seed
RAILS_ENV=production bundle exec rake assets:precompile
