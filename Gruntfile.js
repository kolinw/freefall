module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    /*livereload: {
      port: 35729
    },*/

    connect: {
      dist: {
        options: {
          port: 4000,
          base: 'www/dist'
        }
      },
      dev: {
        options: {
          port: 4000,
          base: 'www/app'
        }
      }
    },

    notify: {
      watch: {
        options: {
          message: 'Sass or Js reloaded',
        }
      },
      connect: {
        options: {
          message: 'Server is ready!'
        }
      }
    },

    watch: {
      /*sass: {
        files: 'src/sass/*.sass',
        tasks: ['sass:dev','notify:watch'],
        options: {
          livereload: true,
        }
      },*/
      other: {
        files: 'www/app/js/**/*.*',
        options: {
          livereload: true,
        }
      }
    },

    /*sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          './www/dist/css/main.css': './src/sass/main.sass'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          './www/app/css/main.css': './src/sass/main.sass'
        }
      }
    },*/

    jshint: {
      options: {
        validthis:true,
        laxcomma: true,
        laxbreak: true,
        browser:  true,
        boss:     true,
        expr:     true,
        asi:      true,
        eqnull:   true,
        loopfunc: false,
      },
      uses_defaults: ['www/app/scripts/**/*.js','!www/app/scripts/vendor/**/*.js']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('run', [/*'sass:dev',*/'connect:dev','notify','watch']);
  grunt.registerTask('prod', [/*'sass:dist',*/'connect:dist']);

  // Default Task
  grunt.registerTask('default', ['run']);

};
