FROM phusion/passenger-ruby22
MAINTAINER Kisitu Augustine <austiine04@gmail.com>

ENV RAILS_ENV production

#bootstrap the docker container
WORKDIR /home/pneuma/scripts
ADD deployment/docker/bootstrap.sh /home/pneuma/scripts/
RUN /home/pneuma/scripts/bootstrap.sh

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

#add secret to the environment
RUN /bin/bash -c 'echo export SECRET_KEY_BASE=$(rake secret)'

ADD deployment/docker/bootstrap_app.sh /home/pneuma/scripts/bootstrap_app.sh
RUN /home/pneuma/scripts/bootstrap_app.sh

#turn nginx on
RUN rm -f /etc/service/nginx/down

#stop both nginx and postgres and start them with supervisor
RUN service postgresql stop
RUN service nginx stop

ADD deployment/config_files/supervisor/pneuma.conf /etc/supervisor/conf.d/pneuma.conf
RUN service supervisor restart

EXPOSE 80

#TODO: 
#(Missing `secret_token` and `secret_key_base` for 'production' environment, set these values in `config/secrets.yml`)
#remove passwords
