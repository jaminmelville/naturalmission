FROM phpdockerio/php7-fpm:latest

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install mysql-client php7.0-mbstring php7.0-mysql php7.0-gd php7.0-xdebug vim \
    && curl https://getcomposer.org/download/1.2.1/composer.phar -L -o /bin/composer && chmod +x /bin/composer \
    && echo 'date.timezone = "Australia/Brisbane"' >> /etc/php/7.0/cli/php.ini \
    && phpdismod xdebug \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN echo "zend_extension=/usr/lib/php/20151012/xdebug.so" >> /etc/php/7.0/fpm/php.ini && \
   echo "xdebug.remote_enable=1" >> /etc/php/7.0/fpm/php.ini && \
   echo "xdebug.remote_handler=dbgp" >> /etc/php/7.0/fpm/php.ini && \
   echo "xdebug.remote_host=172.17.0.1" >> /etc/php/7.0/fpm/php.ini && \
   echo "xdebug.remote_port=9001" >> /etc/php/7.0/fpm/php.ini

ENV PATH="/var/www/naturalmission/vendor/bin:${PATH}"

WORKDIR "/var/www/naturalmission"

EXPOSE 9001
