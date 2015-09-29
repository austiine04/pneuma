#!/bin/bash

set -xe

#generate the secret key
export SECRET_KEY_BASE=$(rake secret)

#migrate the database
cd /home/pneuma/webapp
rake db:setup
