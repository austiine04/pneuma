#!/bin/bash
#ansible-playbook -i deployment/ansible/inventory -l staging --vault-password-file=vault_password deployment/ansible/main.yml -vvvv

function rspec_tests {
  echo "running rspec tests"
  grunt shell:bundler
  grunt shell:migrations
  grunt shell:seed
  grunt shell:rspec
}

function jasmine_tests {
  echo "running javascript unit tests"
  grunt shell:bower
  grunt shell:jasmine
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
