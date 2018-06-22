Natural Mission
===============

# Host requirements:

* docker
* docker-compose
* node
* gulp
* webpack

# Resources

## phpdocker.io
This is used to generate the docker-compose.yml and docker folder contents.
A few files had to be updated and moved around - the web root etc.

## composer drupal
This is used to generate the drupal site using the following command in the php-fpm container:
```
composer create-project drupal-composer/drupal-project:8.x-dev drupal --stability dev --no-interaction
```
Contents of the generated drupal folder were then copied into the root of the project.

## drupal console
This is used to generate the boiler plate code for the profile and theme.
Run the following in the php-fpm container:
```
drupal generate:profile && drupal generate:theme
```

# How to Run

make copies of the .dist files in the root removing the dist extension and set credentials.

```gulp install```

Then boom, go to the localhost:PORT_NUMBER and you should be away laughing.

Server install for digital ocean:
apt install docker docker-compose nginx git npm nodejs-legacy build-essential
mkdir /code
git clone git@github.com:jaminmelville/naturalmission.git /code/naturalmission.com.au
cd /code/naturalmission.com.au/
npm install
npm install -g gulp
cp docker-compose.yml.dist docker-compose.yml
cp drupal.config.json.dist drupal.config.json
gulp install
gulp load (optional)
