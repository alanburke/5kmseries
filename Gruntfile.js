module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    yeoman: {
        // Configurable paths
        app: 'app',
        dist: 'dist'
    },

    // Project configuration
    // ---------------------

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/components'
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          sassDir: 'app/styles',
          imagesDir: 'app/images',
          javascriptsDir: 'dist/scripts',
          cssDir: 'app/css',
          force: true
        }
      }
    },

    // Jekyll
    jekyll: {
        options: {
          src: 'app',
          dest: '_site'
        },
        dist: {
          options: {
            src: 'app',
            dest: '_site'
          },
        },
    },

    // default watch configuration
    watch: {
      options: {
          livereload: true,
      },
      compass: {
        files: [
          'app/styles/**/*.{scss,sass}'
        ],
        tasks: ['compass']
      },
      jekyll: {
        files: [
          'app/_posts/**/*',
          'app/_includes/**/*',
          'app/_layouts/**/*',
          'app/_data/**/*',
        ],
        tasks: ['jekyll']
      },
      livereload: {
        files: [
          'app/*.html',
          'app/css/**/*.css',
          'app/scripts/**/*.js',
          'app/images/**/*',
          '_site/*.html',
        ],
      }
    },

    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: '0.0.0.0'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.tmp',
                    '<%= yeoman.app %>'
                ]
            }
        },
        dist: {
            options: {
                open: true,
                base: '_site',
                livereload: true
            }
        }
    },

    // While Yeoman handles concat/min when using
    // usemin blocks, you can still use them manually
    concat: {
      dist: {
        src: [
          'app/scripts/*.js',
        ],
        dest: 'scripts/build/production.js',
      }
    },

    // Uglify
    uglify: {
        build: {
            src: 'scripts/build/production.js',
            dest: 'scripts/build/production.min.js'
        }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('serve', ['compass', 'jekyll', 'connect:dist', 'watch']);

};
