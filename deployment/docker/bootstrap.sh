#!/bin/bash

set -xe

#specify the locale
export LC_ALL=C

#skip interactive dialogues when installing packages
export DEBIAN_FRONTEND=noninteractive

minimal_apt_get_install='apt-get install -y --no-install-recommends'

#exclude the man pages to reduce the image foot print
echo "path-exclude /usr/share/doc/*" > /etc/dpkg/dpkg.cfg.d/01_nodoc
echo "path-include /usr/share/doc/*/copyright" >> /etc/dpkg/dpkg.cfg.d/01_nodoc
echo "path-exclude /usr/share/man/*" >> /etc/dpkg/dpkg.cfg.d/01_nodoc
echo "path-exclude /usr/share/groff/*" >> /etc/dpkg/dpkg.cfg.d/01_nodoc
echo "path-exclude /usr/share/info/*" >> /etc/dpkg/dpkg.cfg.d/01_nodoc

#install updates
apt-get update
