var gulp = require('gulp')
var spawn = require('child_process').spawn
var runSequence = require('run-sequence')

// @TODO: start needs to wait for mysql to be up and running.
gulp.task('install', ['start'], (callback) => {
    runSequence('install:docker', 'install:drupal', callback)
})

gulp.task('install:docker', (callback) => {
    runCommand("docker-compose",[ 'up', '-d'], callback)
})

gulp.task('install:drupal', (callback) => {
    var options = require('./drupal.config.json')
    var installCommand = 'drupal site:install'
    for (option in options) {
        installCommand += ' --' + option + ' ' + options[option]
    }
    installCommand += ' naturalmission'
    // @TODO: composer install.
    // @TODO: drupal init in dockerfile instead maybe.
    var command = 'cd web; drupal init; drupal database:drop -n; \
        cd sites/default; rm -rf files; cp default.settings.php settings.php; \
        cd ../..; \
        ' + installCommand + '; \
        chown -R www-data:1000 sites/default; chmod 664 sites/default/settings.php; \
        drupal cache:rebuild all; \
        rm -rf config; drupal config:export --directory config'
    runCommandInContainer(command, callback)
})

gulp.task('start', (callback) => {
    runCommand("docker-compose", ['start'], callback)
})

function runCommand(command, param2, param3) {
    var options = typeof(param2) === 'object' ? param2 : []
    var callback = typeof(param2) === 'function' ? param2 : param3
    var shell = spawn(command, options)
    shell.stdout.on('data', function (data) {
      process.stdout.write(data.toString())
    })
    shell.stderr.on('data', function (data) {
      process.stdout.write(data.toString())
    })
    shell.stdin.on('data', function (data) {
      process.stdout.write(data.toString())
    })
    shell.on('exit', callback)
}

function runCommandInContainer(command, callback) {
    runCommand('docker',[ 'exec', '-t', 'naturalmission-php-fpm', 'bash', '-c', command], callback)
}
function runDrupalCommand(command, callback) {
    runCommandInContainer('cd web; drupal ' + command, callback)
}

gulp.task('watch', (callback) => {
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

gulp.task('drupal', (callback) => {
    runDrupalCommand(process.argv[4], callback)
})
