let def = require(__dirname + '/default');

let env = {
    name: 'production',
    constants: {
        header: ['/*', 'This will be the production header', 'of all files', '*/'].join('\n')
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
        concat: {

        },
        uglify: {

        },
        minify: {
            
        }
        /* ... */
    },
    run: {
        /* run plugins */
        js: {
            concat: false,
            uglify: false
        },
        css: {
            concat: false,
            uglify: false
        },
        html: {
            minify: false
        }
    }
}

module.exports = Object.assign({}, def, env);