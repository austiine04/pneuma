#!/bin/bash
#ansible-playbook -i deployment/ansible/inventory -l staging --vault-password-file=vault_password deployment/ansible/main.yml -vvvv

function rspec_tests {
  echo "running rspec tests"
  bundle install
  bin/rake db:migrate RAILS_ENV=test
  bin/rake db:seed
  rspec
}

function jasmine_tests {
  echo "running javascript unit tests"
  bin/rake bower:install
  bundle exec rake teaspoon RAILS_ENV=test
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
