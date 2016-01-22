#!/usr/bin/env bash
set -e

function rspec_tests {
  echo "running rspec tests"
  bundle install
  bin/rake db:migrate RAILS_ENV=test
  bin/rake db:seed
  rspec
}

function jasmine_tests {
  echo "running javascript unit tests"
  npm install
  RAILS_ENV=test bundle exec teaspoon
}

function main {
  case "$1" in
    "rspec" )
      rspec_tests;;

    "jasmine" )
      jasmine_tests;;
  esac
}

main $@
exit 0
