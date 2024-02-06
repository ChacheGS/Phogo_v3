const env = {
    name: 'default',
    constants: {
        header: ['/*', 'This will be the default header', 'of all files', '*/'].join('\n')
    },
    paths: {
        js: {
            src: 'path/to/js/source/files',
            dest: 'path/to/js/destination'
        },
        css: {
            src: 'path/to/css/source/files',
            dest: 'path/to/css/destination'
        },
        html: {
            src: 'path/to/html/source/files',
            dest: 'path/to/html/destination'
        }
        /* add anything else */
    },
    plugin: {
        /* empty on default env. If options are to be passed to plugins, say so for each env */
    },
    run: {
        /* run plugins */
        js: {
            concat: false,
            minify: false,
            header: false
        },
        css: {
            concat: false,
            minify: false,
            header: false
        },
        html: {
            minify: false,
            header: false
        }
    }
}

module.exports = env;
