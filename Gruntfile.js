module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            target: {
                src: 'index.html'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['scripts/*.js', 'scripts/**/*.js'],
                dest: 'dist/blizz.js'
            },
            assets: {
                src: [
                    'bower_components/angular/**/*.min.js',
                    'bower_components/**/*.min.js',
                    'bower_components/stackexchange/all.js',
                    '!bower_components/app/*.js',
                    '!bower_components/app/**/*.js',
                ],
                dest: 'dist/assets.js'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: {
                    'dist/blizz.annotated.js': ['dist/blizz.js'],
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyymmdd") %> */\n',
                compress: false,
                wrap: true,
                mangle: true
            },
            dist: {
                files: {
                    'dist/blizz.min.js': ['dist/blizz.annotated.js'],
                    'dist/assets.min.js': ['dist/assets.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['scripts/*.js', 'scripts/**/*.js'],
                tasks: ['concat', 'ngAnnotate'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('default', [
        'concat',
        'ngAnnotate',
    ]);
    grunt.registerTask('minify', [
        'concat',
        'ngAnnotate',
        'uglify'
    ]);
};
