FROM phusion/passenger-ruby22
MAINTAINER Kisitu Augustine <austiine04@gmail.com>

ENV RAILS_ENV production

#bootstrap the docker container
WORKDIR /home/pneuma/scripts
ADD deployment/docker/bootstrap.sh /home/pneuma/scripts/
RUN /home/pneuma/scripts/bootstrap.sh

#volume for postgres data
VOLUME /var/lib/postgresql/9.3/main

ENTRYPOINT ["/sbin/my_init"]
CMD ["--"]

#copy codebase
ADD . /srv/pneuma

#bundle install
WORKDIR /srv/pneuma
RUN bundle install --without development test --jobs 4 --path vendor/ && \
    rm -Rf vendor/ruby/2.2.2/cache

RUN npm install bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN rake bower:install

#load the vhost file
ADD deployment/config_files/nginx/pneuma.conf /etc/nginx/sites-enabled/pneuma.conf
RUN rm /etc/nginx/sites-enabled/default

ADD deployment/docker/bootstrap_app.sh /home/pneuma/scripts/bootstrap_app.sh
RUN /home/pneuma/scripts/bootstrap_app.sh

#runit config for postgres
ADD deployment/config_files/runit/postgresql/ /etc/service/postgresql/
RUN chmod +x /etc/service/postgresql/run

#turn nginx on
RUN rm -f /etc/service/nginx/down

EXPOSE 80

#TODO: 
#need to seperate out s3 buckets for different environments
#remove passwords
