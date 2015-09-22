#!/bin/bash

set -xe

cd /home/pneuma/webapp
rake db:migrate
rake db:seed
