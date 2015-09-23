#!/bin/bash

set -xe

#migrate the database
cd /home/pneuma/webapp
rake db:setup
