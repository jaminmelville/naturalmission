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
    ], callback)
})

gulp.task('install:composer', (callback) => {
    runCommandInContainer('composer install', () => { callback() })
})

gulp.task('install:drupal', (callback) => {
    var options = require('./drupal.config.json')

    /*
    @TODO: Once drupal console supports not having db prefix use it and then wont need drush.
    var installCommand = 'drupal init --override --no-interaction; drupal site:install'
    for (option in options) {
        installCommand += ' --' + option + ' ' + options[option]
    }
    installCommand += ' naturalmission'
    */

    // Using drush to install site.
    installCommand = 'drush -y site-install naturalmission --db-url=mysql://'
    + options['db-user'] + ':' + options['db-pass'] + '@' + options['db-host'] + '/' + options['db-name']
    + ' --account-pass=' + options['account-pass']
    + ' --site-name=' + options['site-name']

    var command = 'cd web; drupal database:drop -n; \
        cd sites/default; rm -rf files; cp default.services.yml services.yml; cp default.settings.php settings.php; \
        cd ../..; \
        ' + installCommand + '; \
        drupal cache:rebuild all; \
        chown -R www-data:1000 sites/default; chmod 775 sites/default; \
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

gulp.task('save', (callback) => {
    async.series([
        (cb) => {
            runDrupalCommand('database:dump --file ../save/dump.sql', cb)
        },
        (cb) => {
            runCommandInContainer('rm -r save/files/; cp -r web/sites/default/files/ save/', cb)
        }
    ], callback)
})

gulp.task('load', (callback) => {
    async.series([
        (cb) => {
            runDrupalCommand('database:restore --file=../save/dump.sql', cb)
        },
        (cb) => {
            runCommandInContainer('rm -r web/sites/default/files/; \
            cp -r save/files/ web/sites/default/; \
            chown -R www-data:1000 web/sites/default', cb)
        }
    ], callback)
})

var browserSync = require('browser-sync').create()
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: "naturalmission.dev"
    })
    gulp.watch("web/themes/**/*").on('change', browserSync.reload);
})

gulp.task('debug', (callback) => {
    async.series([
        (cb) => {
            runCommandInContainer('phpenmod xdebug', cb)
        },
        (cb) => {
            runCommandInContainer('chmod -R 777 web/sites/default', cb)
        },
        (cb) => {
            runDrupalCommand('drupal module:install devel devel_generate devel_kint', cb)
        }
    ], callback)
})
