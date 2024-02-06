let def = require(__dirname + '/default');

const root = '.tmp';

let env = {
    name: 'development',
    constants: {
        header: ['/*', 'This will be the development header', 'of all files', '*/'].join('\n')
    },
    paths: {
        root: root,
        js: {
            src: 'js/*.js',
            dest: root + '/js'
        },
        css: {
            src: root + '/css',
            dest: root + '/css'
        },
        less: {
            src: ['less/*.less', '!less/*variables*.less', '!less/*mixin*.less'],
            dest: root + '/css',
        },
        html: {
            src: 'pages/index.html',
            dest: root
        },
        clean: [root]
        /* add anything else */
    },
    plugin: {
        serve: {
            init: {
                server: {
                    baseDir: root
                },
            },
            opts: {
                stream: true
            }
        },
        'minify-css': {
            suffix: '.min'
        },
        'minify-js': {
            suffix: '.min'
        }
        /* ... */
    },
    run: {
        /* run plugins on stuff */
        clean: true,
        js: {
        },
        css: {
            less: true,
        },
        html: {
        },
        serve: true,
        watch: {
            files: {
                js: true,
                less: true,
                py: true,
                html: true
            },
            reload: true
        }
    }
}

module.exports = Object.assign({}, def, env);