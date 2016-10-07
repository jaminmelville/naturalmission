var gulp = require('gulp')
var spawn = require('child_process').spawn
var runSequence = require('run-sequence')
var async = require('async')

function runCommand(command, param2, param3) {
    var options = typeof(param2) === 'object' ? param2 : []
    var callback = typeof(param2) === 'function' ? param2 : param3
    var shell = spawn(command, options)
    shell.stdout.on('data', function(data) {
        process.stdout.write(data.toString())
    })
    shell.stderr.on('data', function(data) {
        process.stdout.write(data.toString())
    })
    shell.stdin.on('data', function(data) {
        process.stdout.write(data.toString())
    })
    shell.on('exit', callback)
}

function runCommandInContainer(command, callback) {
    runCommand('docker', ['exec', '-t', 'naturalmission-php-fpm', 'bash', '-c', command], callback)
}

function runDrupalCommand(command, callback) {
    runCommandInContainer('cd web; drupal ' + command, callback)
}

gulp.task('install', (callback) => {
    runSequence('install:docker', 'install:composer', 'install:drupal', callback)
})

gulp.task('install:docker', (callback) => {
    async.series([
        (cb) => {
            runCommand("docker-compose", ['up', '-d'], cb)
        },
        (cb) => {
            // Wait for services in container to be up.
            runCommand('sleep', ['10'], cb)
        }
    ], callback);
})

gulp.task('install:composer', (callback) => {
    runCommandInContainer('composer install', () => { callback() })
})

gulp.task('install:drupal', (callback) => {
    // @TODO: drop database prefix once drupal console supports it.
    var installCommand = 'drupal init --override --no-interaction; drupal site:install'
    var options = require('./drupal.config.json')
    for (option in options) {
        installCommand += ' --' + option + ' ' + options[option]
    }

    installCommand += ' naturalmission'

    /* Alternatively using drush:
    installCommand = 'drush -r $(pwd)/web -y site-install naturalmission --db-url=mysql://USER:PASSWORD@HOST/DATABASE --account-pass=PASSWORD --site-name="natural mission"'
    */

    var command = 'cd web; drupal database:drop -n; \
        cd sites/default; rm -rf files; cp default.services.yml services.yml; cp default.settings.php settings.php; \
        cd ../..; \
        ' + installCommand + '; \
        chown -R www-data:1000 sites/default; chmod 775 sites/default; \
        drupal cache:rebuild all; \
        rm -rf config; drupal config:export --directory config'
    runCommandInContainer(command, callback)
})

gulp.task('start', (callback) => {
    runCommand("docker-compose", ['start'], callback)
})

gulp.task('watch', ['browser-sync'], (callback) => {
    runCommand('webpack', ['--progress', '--colors', '--watch'], callback)
})

gulp.task('twig:debug', (callback) => {
    runDrupalCommand('site:mode dev', callback)
})

gulp.task('cache:rebuild', (callback) => {
    runDrupalCommand('cache:rebuild all', callback)
})

gulp.task('config:diff', (callback) => {
    runDrupalCommand('config:diff -n config', callback)
})

var browserSync = require('browser-sync').create()
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: "naturalmission.dev"
    })
    gulp.watch("web/themes/**/*").on('change', browserSync.reload);
})
