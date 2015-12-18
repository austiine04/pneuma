module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngconstant: {
      //options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config'
      },

      development: {
        options: {
          dest: '<%= pkg.appdir %>/config.js'
        },
        constants: {
          ENV: {
            bucketname: 'pneuma-dev'
          }
        }
      },

      staging: {
        options: {
          dest: '<%= pkg.appdir %>/config.js'
        },
        constants: {
          ENV: {
            bucketname: 'pneuma-staging'
          }
        }
      },

      production: {
        options: {
          dest: '<%= pkg.appdir %>/config.js'
        },
        constants: {
          ENV: {
            bucketname: 'pneuma-production'
          }
        }
      }
    },

    shell: {
      server: {
        command: 'rails server'
      },
      migrations: {
        command: 'rake db:migrate'
      },
      seed: {
        command: 'rake db:seed'
      }
    }
  });

  //load grunt plugins
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-shell-spawn');

  //custom grunt tasks
  grunt.registerTask('serve', 'start server ...', ['ngconstant:development', 'shell:migrations', 'shell:seed', 'shell:server']);

  //default task
  grunt.registerTask('default', ['serve']);
};
