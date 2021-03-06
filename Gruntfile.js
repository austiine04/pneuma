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
        command: 'bin/rake db:migrate RAILS_ENV=test'
      },
      seed: {
        command: 'bundle exec rake db:seed'
      },
      bower: {
        command: 'bundle exec rake bower:install'
      },
      bundler: {
        command: 'bundle install'
      },
      rspec: {
        command: 'rspec'
      },
      jasmine: {
        command: 'bundle exec rake teaspoon RAILS_ENV=test'
      }
    }
  });

  //load grunt plugins
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-shell-spawn');

  //custom grunt tasks
  grunt.registerTask('staging-config', '', ['ngconstant:staging']);
  grunt.registerTask('production-config', '', ['ngconstant:production']);
  grunt.registerTask('serve', 'start server ...', ['shell:bundler', 'shell:bower', 'ngconstant:development', 'shell:migrations', 'shell:seed', 'shell:server']);

  //default task
  grunt.registerTask('default', ['serve']);
};
