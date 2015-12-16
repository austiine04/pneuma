#!/bin/bash

# migrate db
service postgresql start
rake db:migrate
rake db:seed
service postgresql stop

# precompile the assets
rake assets:precompile