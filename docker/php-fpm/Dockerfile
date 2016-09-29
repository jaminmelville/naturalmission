FROM phpdockerio/php7-fpm:latest

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install php7.0-mbstring php7.0-mysql php7.0-gd php7.0-xdebug \
    && curl https://drupalconsole.com/installer -L -o /bin/drupal && chmod +x /bin/drupal \
    && curl https://getcomposer.org/download/1.2.1/composer.phar -L -o /bin/composer && chmod +x /bin/composer \
    && echo 'date.timezone = "Australia/Brisbane"' >> /etc/php/7.0/cli/php.ini \
    && phpdismod xdebug \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

WORKDIR "/var/www/naturalmission"
