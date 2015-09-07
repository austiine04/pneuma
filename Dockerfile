FROM phusion/passenger-ruby22
MAINTAINER Kisitu Augustine <austiine04@gmail.com>

#bootstrap the docker container
WORKDIR /home/pneuma/scripts
ADD deployment/docker/bootstrap.sh /home/pneuma/scripts/
RUN /home/pneuma/scripts/bootstrap.sh

ENTRYPOINT ["/sbin/my_init"]

#copy codebase
WORKDIR /home/pneuma/webapp

ADD /app /home/pneuma/webapp/app/
ADD /bin /home/pneuma/webapp/bin/
ADD /config /home/pneuma/webapp/config/
ADD /db /home/pneuma/webapp/db/
ADD /lib /home/pneuma/webapp/lib/
ADD /log /home/pneuma/webapp/log/
ADD /public /home/pneuma/webapp/public/
ADD /tmp /home/pneuma/webapp/tmp/
ADD Bowerfile /home/pneuma/webapp/
ADD config.ru /home/pneuma/webapp/
ADD Gemfile /home/pneuma/webapp/
ADD Gemfile.lock /home/pneuma/webapp/
ADD Rakefile /home/pneuma/webapp/
RUN mkdir -p vendor/assets

#install dependencies 
RUN bundle install --without development test --jobs 4

#load the vhost file
ADD deployment/config_files/nginx/pneuma.conf /etc/nginx/sites-enabled/pneuma.conf
RUN rm /etc/nginx/sites-enabled/default

#turn nginx on 
RUN rm -f /etc/service/nginx/down


#TODO: create a production.log file
#TODO: (Missing `secret_token` and `secret_key_base` for 'production' environment, set these values in `config/secrets.yml`)
