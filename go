#!/bin/bash

ansible-playbook -i deployment/ansible/inventory -l staging --vault-password-file=vault_password deployment/ansible/main.yml
