module.exports = function () {
    var root = './';
    var src = root + 'src/';
    var dest = root + 'dist/';
    var node = root + 'node_modules/';

    var config = {
        /** Root Folders */

        scss: {
            src: [
                // root + 'scss/**/*.scss',
                // root + 'scss/*.scss',
                // '!' + root + '/scss/bootstrap.scss',
                // '!' + root + 'scss/_variables.scss',
                src + 'scss/styles.scss'
            ],
            dest: dest + 'css'
        },

        js: {
            src: src + 'js/scripts.js',
            dest: dest + 'js'
        },
        html: {
            src: [
                src + './**/*.html',
                '!' + src + 'partials/**'
            ],
            partials: [
                src + 'partials/**/*.html'
            ],
            dest: root + 'dist/'
        },
        bootstrap: {
            scss: {
                src:  src + 'scss/bootstrap.scss',
                dest: dest + 'vendor/bootstrap/css'
            },
            js:  {
                src:  node + 'bootstrap/dist/js/bootstrap.js',
                dest: dest + 'vendor/bootstrap/js'
            }
        },
        jquery:{
            js: {
                src: node + 'jquery/dist/jquery.js',
                dest: dest + 'vendor/jquery'
            },
            ui: {
                src: node + 'jquery/dist/jquery.js',
                dest: dest + 'vendor/jquery'
            }
        },

        /** Clean - Pre-Build */
        clean: {
            js: [
                dest + 'lib/*',
                dest + 'js/*'
            ],
            css: dest + 'css/*'
        },
        dest: dest
    };

    return config
};
